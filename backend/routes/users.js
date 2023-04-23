const express = require('express');
const router = express.Router();
const { users } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../auth/authMiddleWare');

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

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/id/:id', authMiddleWare, (req, res, next) => {
  console.log('router get users by id called')
  users.findOne(
    { _id: req.params.id },
    { username: 1, role: 1, _id: 0 }, // projection parameter
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
