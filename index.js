const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
let users = [
  { id: '1', name: 'Durga Prasad Shetty', email: 'dps2k811@gmail.com', role: 'admin' },
];

// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET endpoint to retrieve a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
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

// PUT endpoint to update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  // Validate required fields
  if (!updatedUser.name || !updatedUser.email || !updatedUser.role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Find and update the user
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { id, ...updatedUser };
    res.json({ message: 'User updated successfully', user: users[index] });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// DELETE endpoint to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
