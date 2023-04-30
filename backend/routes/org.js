// This file contains API endpoints for interacting with "org" collection in MongoDB database

// Import functionalities
const express = require('express')
const router = express.Router()

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare')

// importing data model schemas
const { orgs } = require('../models/models')

// API endpoint to get org 
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  orgs.findOne(
    { _id: req.params.id },
    {name: 1, _id: 0},
    (error, data) => {
      if (error) {
        return next(error);
      } else if (!data) {
        res.status(400).send('Organization not found');
      } else {
        res.json(data);
      }
    }
  )
});

module.exports = router
