// This file contains API endpoints for interacting with the "services" collection of the MongoDB database

// import functionalities
const express = require('express');
const router = express.Router();

// import services schema
const { services } = require('../models/models');

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// API endpoint to GET 10 most recent services for org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services
    .find({ org: org, active: true }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
    .sort({ updatedAt: -1 })
    .limit(10);
});

// API endpoint to GET all active services from org
router.get('/active', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services
    .find({ org: org, active: true }, { _id: 1, name: 1, description: 1 }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
});

// API endpoint to GET single service by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services.findOne({ _id: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Service not found');
    } else {
      res.json(data);
    }
  });
});

// API endpoint to GET entries based on search query
router.get('/search', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { org: org, active: true };
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' };
      break;
    case 'description':
      dbQuery.description = { $regex: `${req.query.description}`, $options: 'i' };
      break;
    default:
      return res.status(400).send('invalid searchBy');
  }
  services.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// API endpoint to POST new service
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newService = req.body;
  newService.org = [org];
  services.create(newService, (error, data) => {
    if (error) {
      return next(error);
    } else {      
      const message = { success: true, message: "New service created successfully" };
      res.status(201).json(message);
    }
  });
});

// API endpoint to PUT -> update service
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      const message = { success: true, message: "Service updated successfully" };
      res.status(201).json(message);
    }
  });
});

// API endpoint to PUT -> soft delete service
router.put('/deactivate/:id', authMiddleWare, (req, res, next) => {
  const update = { active: false };
  services.findByIdAndUpdate(req.params.id, update, (error, data) => {
    if (error) {
      return next(error);
    } else {
      const message = { success: true, message: "Service deactivated successfully" };
      res.status(200).json(message);
    }
  });
});

module.exports = router;
