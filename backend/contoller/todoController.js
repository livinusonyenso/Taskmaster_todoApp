const { body, validationResult } = require("express-validator");
const { User,Todo } = require("../models/todoModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id; // Attach user ID to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Validation middleware for creating/updating a todo
exports.validateTodo = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

// Get all todos for a user
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    console.log("User ID in request:", req.user);

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description } = req.body;
    const todo = new Todo({ title, description, userId: req.user });
    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { title, description },
      { new: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User registration
// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token, user: { id: user.id, name, email } });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Check if JWT_SECRET is set in .env
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, name, email } });
  } catch (err) {
    console.error("Registration Error:", err); // Log the actual error
    res.status(500).json({ msg: "Server error", error: err.message }); // Send detailed error
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received request body:", req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("Login successful:", { id: user.id, email: user.email });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};