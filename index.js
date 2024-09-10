const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
let users = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
];

// GET endpoint to retrieve users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST endpoint to add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Validate required fields
  if (!newUser.id || !newUser.name || !newUser.email || !newUser.role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if email already exists
  const userEmails = users.map(user => user.email);
  if (userEmails.includes(newUser.email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Check if ID already exists
  const userIds = users.map(user => user.id);
  if (userIds.includes(newUser.id)) {
    return res.status(400).json({ error: 'ID already exists' });
  }

  // Add the new user
  users.push(newUser);

  res.status(201).json({ message: 'User added successfully', newUser });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
