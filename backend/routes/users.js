// This file contains all API endpoints for interacting with the "users" collection in the MongoDB database

// import functionalities
const express = require('express');
const router = express.Router();

// import users data model schema
const { users } = require('../models/models');

// import bcrypt for comparing password to hashed password
const bcrypt = require('bcrypt');

// import JWT (JSON Web Token) to assign a web token to the user after a successful login - allows user to make API calls
const jwt = require('jsonwebtoken');

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// API endpoint to handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      org: user.org,
    };

    // token expires in 30 days. This is not good security practice, but to ensure that API calls work in the Postman documentation when the professor runs the documentation, 30 days is necessary
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// API endpoint to find user by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  users.findOne(
    { _id: req.params.id },
    { username: 1, role: 1, _id: 0 },
    (error, data) => {
      if (error) {
        return next(error);
      } else if (!data) {
        res.status(400).send('User not found');
      } else {
        res.json(data);
      }
    }
  );
});


module.exports = router;
