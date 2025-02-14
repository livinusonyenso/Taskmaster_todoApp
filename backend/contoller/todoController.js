const { body, validationResult } = require('express-validator');
const Todo = require('../models/todoModel'); // Import the Mongoose Todo model

// Validation middleware for creating/updating a todo
exports.validateTodo = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Fetch all todos from MongoDB
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Find todo by ID
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const errors = validationResult(req); // Validate request body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const todo = new Todo({ title, description }); // Create a new Todo document
    await todo.save(); // Save the document to MongoDB
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req); // Validate request body
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id, // Find todo by ID
      { title, description }, // Update fields
      { new: true } // Return the updated document
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id); // Find and delete todo by ID
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};