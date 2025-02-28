const express = require("express");
const { validateTodo, getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo , registerUser, loginUser } = require("../contoller/todoController");
// const { registerUser, loginUser } = require("../contoller/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Todo Routes (Protected)
// router.get("/todos", authMiddleware, getAllTodos);
// router.get("/todos/:id", authMiddleware, getTodoById);
// router.post("/todos", authMiddleware, validateTodo, createTodo);
// router.put("/todos/:id", authMiddleware, validateTodo, updateTodo);
// router.delete("/todos/:id", authMiddleware, deleteTodo);

router.get("/", getAllTodos);  // ✅ No extra "/todos"
router.get("/:id", getTodoById);
router.post("/",authMiddleware, validateTodo, createTodo);
router.put("/:id", validateTodo, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
