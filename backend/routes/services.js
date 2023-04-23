const express = require('express');
const router = express.Router();

const { services } = require('../models/models');
const authMiddleWare = require('../auth/authMiddleWare');

// checked
// GET 10 most recent services for org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
    .sort({ updatedAt: -1 })
    .limit(10);
});

// GET all active services from org
router.get('/active', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services
    .find({ org: org, active: true }, { _id: 1, name: 1 }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
});

// checked
// GET single service by ID
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

// checked
// GET entries based on search query
router.get('/search', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { org: org };
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.name = { $regex: `^${req.query.name}`, $options: 'i' };
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

// checked
// POST new service
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newService = req.body;
  newService.org = [org];
  services.create(newService, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// PUT update service
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// hard DELETE service by ID
router.delete('/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Service not found');
    } else {
      res.send('Service deleted');
    }
  });
});

module.exports = router;
