const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory task list
let todos = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});


app.post('/api/todos', (req, res) => {
  const task = req.body.task;
  if (task) {
    const newTask = {
      task,
      timestamp: new Date().toISOString()
    };
    todos.push(newTask); // ✅ Push the full object
    res.status(201).json({ message: 'Task added' });
  } else {
    res.status(400).json({ error: 'Task is required' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




