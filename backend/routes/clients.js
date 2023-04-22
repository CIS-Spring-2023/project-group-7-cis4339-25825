const express = require('express');
const router = express.Router();
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { clients } = require('../models/models');

// checked
// Get all clients
router.get('/test', authMiddleWare, async (req, res) => {
  const testorg = req.user.org;
  try {
    const Clients = await clients.find({ org: testorg });
    res.json(Clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// checked
// GET 10 most recent clients for org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  clients
    .find({ orgs: org }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    })
    .sort({ updatedAt: -1 })
    .limit(10);
});

// checked
// GET single client by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  clients.findOne({ _id: req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Client not found');
    } else {
      res.json(data);
    }
  });
});

// checked
// GET entries based on search query
// Ex: '...?firstName=Bob&lastName=&searchBy=name'
router.get('/search', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { orgs: org };
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.firstName = { $regex: `^${req.query.firstName}`, $options: 'i' };
      dbQuery.lastName = { $regex: `^${req.query.lastName}`, $options: 'i' };
      break;
    case 'number':
      dbQuery['phoneNumber.primary'] = {
        $regex: `^${req.query['phoneNumber.primary']}`,
        $options: 'i',
      };
      break;
    default:
      return res.status(400).send('invalid searchBy');
  }
  clients.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// GET lookup by phone, verify org membership on frontend
router.get('/lookup/:phoneNumber', authMiddleWare, (req, res, next) => {
  clients.findOne(
    {
      ['phoneNumber.primary']: {
        $regex: `^${req.params.phoneNumber}`,
        $options: 'i',
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// checked
// POST new client
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newClient = req.body;
  newClient.orgs = [org];
  clients.create(newClient, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// PUT update client
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// 
// PUT add existing client to org
router.put('/register/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  clients.findByIdAndUpdate(
    req.params.id,
    { $push: { orgs: org } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.send('Client registered with org');
      }
    }
  );
});

// checked
// PUT remove existing client from org
router.put('/deregister/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  clients.findByIdAndUpdate(
    req.params.id,
    { $pull: { orgs: org } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.send('Client deregistered with org');
      }
    }
  );
});

// checked
// hard DELETE client by ID, as per project specifications
router.delete('/:id', authMiddleWare, (req, res, next) => {
  clients.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Client not found');
    } else {
      res.send('Client deleted');
    }
  });
});

module.exports = router;
