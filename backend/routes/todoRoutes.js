const express = require("express");
const { validateTodo, getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, registerUser, loginUser } = require("../contoller/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Todo Routes (Protected)

router.get("/", authMiddleware, async (req, res) => {
    try {
        console.log("Authenticated user:", req.user.id); // ✅ Debugging log
        const todos = await todos.find({ userId: req.user.id }); // ✅ Only fetch user's todos
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);

        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", authMiddleware, validateTodo, async (req, res) => {
    try {
        const newTodo = await createTodo({ ...req.body, userId: req.user.id });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", authMiddleware, validateTodo, async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);

        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedTodo = await updateTodo(req.params.id, req.body);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await getTodoById(req.params.id);

        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await deleteTodo(req.params.id);
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

