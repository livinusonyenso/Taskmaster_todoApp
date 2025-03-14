const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Todo Schema with User Reference
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "in-progress", "completed"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  date: { type: String, required: true }, // ✅ Store date
  time: { type: String, required: true }, // ✅ Store time
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }, // ✅ Add priority
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { User, Todo };
