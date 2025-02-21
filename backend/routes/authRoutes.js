const express = require("express");
const router = express.Router();
const { registerUser } = require("../contoller/todoController");

router.post("/register", registerUser);

module.exports = router;
