const express = require('express');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Server running ');
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});