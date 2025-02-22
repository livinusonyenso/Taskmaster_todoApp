const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../contoller/todoController");
console.log("✅ authRoutes.js loaded");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login", (req, res) => {
    console.log("🟢 Login route hit! Request Body:", req.body);
    loginUser(req, res);
});
module.exports = router;
