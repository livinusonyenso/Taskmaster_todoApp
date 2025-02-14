// const express = require('express');
// const dotenv = require('dotenv');
// const todoRoutes = require('./routes/todoRoutes');
// const errorHandler = require('./middlewares/errorHandler');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// const cors = require('cors');
// app.use(cors());


// app.use(express.json());

// // Routes

// // Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Server running ');
// });

// app.use('/api/todos', todoRoutes);

// // Error handling middleware
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.send('✅ Todo App with MongoDB is running!');
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
