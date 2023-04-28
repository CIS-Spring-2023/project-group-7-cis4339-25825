const express = require('express');
const router = express.Router();
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { clients, events } = require('../models/models');
const { ObjectId } = require('mongodb');


// checked
// accounted
// Get all clients
router.get('/all', async (req, res) => {
  try {
    const Clients = await clients.find({});
    res.json(Clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// accounted
// Get all clients for org
router.get('/org', authMiddleWare, async (req, res) => {
  const org = req.user.org;
  try {
    clients
      .find({ orgs: org}, (error, data) => {
        if (error) {
          return next(error);
        } else {
          return res.json(data)
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// checked
// accounted
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
// accounted
// GET single client by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const query = {
    _id: { $eq: ObjectId(req.params.id) },
    orgs: { $eq: org }
  };
  clients.findOne(query, (error, data) => {
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
// accounted
// GET entries based on search query
// Ex: '...?firstName=Bob&lastName=&searchBy=name'
router.get('/search', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { orgs: org };
  let queryArray = [];
  let regexOptions = 'i';

  switch (req.query.searchBy) {
    case 'name':
      if (req.query.firstName) {
        const firstNameRegex = new RegExp(`.*${req.query.firstName}.*`, regexOptions);
        queryArray.push({ firstName: { $regex: firstNameRegex } });
      }
      if (req.query.lastName) {
        const lastNameRegex = new RegExp(`.*${req.query.lastName}.*`, regexOptions);
        queryArray.push({ lastName: { $regex: lastNameRegex } });
      }
      break;
    case 'number':
      if (req.query.phoneNumber) {
        const phoneNumberRegex = new RegExp(`.*${req.query.phoneNumber}.*`, regexOptions);
        queryArray.push({ 'phoneNumber.primary': { $regex: phoneNumberRegex } });
      }
      break;
    default:
      return res.status(400).send('invalid searchBy');
  }

  dbQuery['$and'] = queryArray;
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
// accounted
// POST new client
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newClient = req.body;
  newClient.orgs = [org];
  clients.create(newClient, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // res.json(data);
      const message = { success: true, message: "New client created successfully" };
      res.status(201).json(message);
    }
  });
});

// checked
// accounted
// PUT update client
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // res.json(data);
      const message = { success: true, message: "Client updated successfully" };
      res.status(201).json(message);
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
// accounted
// PUT remove existing client from org and all events under that org
router.put('/deregister/:id', authMiddleWare, async (req, res, next) => {
  const org = req.user.org;
  try {
    // Remove the client from the org's client list
    const client = await clients.findByIdAndUpdate(
      req.params.id,
      { $pull: { orgs: org } }
    ).exec();

    // Remove the client from all events under the same org
    await events.updateMany(
      { org: org },
      { $pull: { attendees: client._id } }
    ).exec();

    // res.send('Client deregistered with org and removed from events');
    const message = { success: true, message: "Client deregistered with org and events successfully" };
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    return next(error);
  }
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
      // res.send('Client deleted');
      const message = { success: true, message: "Client deleted successfully" };
      res.status(201).json(message);
    }
  });
});

module.exports = router;
