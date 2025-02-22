

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const authRoutes = require("./routes/todoRoutes");
// const todoRoutes = require("./routes/authRoutes");
const authRoutes = require("./routes/authRoutes"); 
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("✅ Todo App with Authentication is running!");
});

// app.use("/api/auth", authRoutes);
// app.use("/api/todos", todoRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
