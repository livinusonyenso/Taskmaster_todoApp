
const express = require("express");
const mongoose = require("mongoose"); // ✅ Ensure mongoose is imported

const { registerUser, loginUser } = require("../contoller/todoController"); // ✅ Fixed typo in "controller"
const authMiddleware = require("../middlewares/authMiddleware");
const { Todo } = require("../models/todoModel");

const router = express.Router();

// ✅ Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Fetch all todos for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.toString(); // Ensure it's a string
        const todos = await Todo.find({ userId });
        res.json(todos);
    } catch (err) {
        console.error("❌ Error fetching todos:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Fetch a single todo (ensure user can only fetch their own)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.toString();
        const todo = await Todo.findOne({ _id: req.params.id, userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        res.json(todo);
    } catch (error) {
        console.error("❌ Error fetching single todo:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Create a new todo
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, date, time, priority } = req.body;
        const userId = req.user.toString(); // Ensure it's a string

        if (!title || !description || !date || !time || !priority) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newTodo = new Todo({ title, description, date, time, priority, userId });
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        console.error("❌ Error creating todo:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Update a todo (only if it belongs to the logged-in user)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, description, date, time, priority } = req.body;
        const userId = req.user.toString();

        const todo = await Todo.findOne({ _id: req.params.id, userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        // ✅ Update todo fields
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (date) todo.date = date;
        if (time) todo.time = time;
        if (priority) todo.priority = priority;

        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error("❌ Error updating todo:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Delete a todo (only if it belongs to the logged-in user)


router.delete("/:id", authMiddleware, async (req, res) => {
    console.log("🚀 todoRoutes.js file loaded successfully");

    try {
      const userId = req.user?.toString();
      const todoId = req.params.id;
  
      console.log(`🔍 Delete Request: Todo ID = ${todoId}, User ID = ${userId}`);
  
      // ✅ Check if todoId is provided
      if (!todoId) {
        console.log("❌ Missing Todo ID");
        return res.status(400).json({ msg: "Todo ID is required" });
      }
  
      // ✅ Validate ID format
      if (!mongoose.Types.ObjectId.isValid(todoId)) {
        console.log("❌ Invalid Todo ID format:", todoId);
        return res.status(400).json({ msg: "Invalid Todo ID format" });
      }
      
      const todoObjectId = new mongoose.Types.ObjectId(todoId);
  
      // ✅ Find the todo
      //const todo = await Todo.findById(todoObjectId);
      const todo = await Todo.findOne({ _id: todoObjectId, userId });

      console.log(`🔍 Searching for Todo: ${todoObjectId}`);
  
      if (!todo) {
        console.log("❌ Todo not found in database");
        return res.status(404).json({ msg: "Todo not found" });
      }
  
      // ✅ Check if the authenticated user owns the todo
      if (todo.userId.toString() !== userId) {
        console.log("❌ Unauthorized: User does not own this todo");
        return res.status(403).json({ msg: "Not authorized" });
      }
  
      // ✅ Delete the todo
      //const deleted = await Todo.deleteOne({ _id: todoObjectId });
      const deleted = await Todo.findOneAndDelete({ _id: todoObjectId, userId });

      console.log(`🗑️ Deleted Count: ${deleted.deletedCount}`);
  
      if (deleted.deletedCount === 0) {
        return res.status(500).json({ msg: "Failed to delete todo" });
      }
  
      console.log("✅ Todo deleted successfully");
      res.json({ msg: "Todo deleted successfully" });
  
    } catch (err) {
      console.error("❌ Error deleting todo:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  


module.exports = router;
