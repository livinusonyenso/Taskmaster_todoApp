const express = require("express");
const { validateTodo, getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require("../contoller/todoController");
const { registerUser, loginUser } = require("../contoller/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Todo Routes (Protected)
router.get("/todos", authMiddleware, getAllTodos);
router.get("/todos/:id", authMiddleware, getTodoById);
router.post("/todos", authMiddleware, validateTodo, createTodo);
router.put("/todos/:id", authMiddleware, validateTodo, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

module.exports = router;
