// This file contains API endpoints for interacting with the "events" collection in the MongoDB database

// import functionalities
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { events, clients } = require('../models/models');

// API endpoint to GET 10 most recent events for all orgs
router.get('/all', (req, res, next) => {
  events
    .find({}, (error, data) => {
      if (error) {
        return next(error);
      } else {        
        return res.json(data);
      }
    })
    // sort by date descending
    .sort({ date: -1 })
    .limit(10);
});

// API endpoint to GET 10 most recent events for org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;  
  events
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error);
      } else {        
        return res.json(data);
      }
    })
    // sort by date descending
    .sort({ date: -1 })
    .limit(10);
});

// API endpoint to GET single event by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOne({ _id: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Event not found');
    } else {
      res.json(data);
    }
  });
});

// API endpoint to GET events based on search query
// Ex: '...?name=Food&searchBy=name'
router.get('/search/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { org: org };
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' };
      break;
    case 'date':
      dbQuery.date = req.query.eventDate;
      break;
    default:
      return res.status(400).send('invalid searchBy');
  }
  events.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// API endpoint to GET events for which a client is signed up
router.get('/client/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.find({ attendees: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// API endpoint to GET events for which a client is not signed up
router.get('/client/:id/not-registered', authMiddleWare, async (req, res, next) => {
  const org = req.user.org;
  try {
    const eventsNotRegistered = await events.find({ attendees: { $nin: [req.params.id] }, org: org });
    res.json(eventsNotRegistered);
  } catch (error) {
    next(error);
  }
});

// API endpoint to GET all attendees for an event
router.get('/attendees/:id', authMiddleWare, (req, res, next) => {
  const eventId = req.params.id;
  events.findById(eventId, (error, event) => {
    if (error) {
      return next(error);
    } else {    
      const attendeeIds = event.attendees.map(attendee => attendee.toString());
      clients.find({_id: {$in: attendeeIds}}, (error, clients) => {
        if (error) {
          return next(error);
        } else {
          res.json(clients);
        }
      });
    }
  });
});

// API endpoint to GET all events for a given service
router.get('/service/:id', authMiddleWare, async (req, res, next) => {
  const org = req.user.org;
  const serviceId = req.params.id;
  try {
    const eventsWithService = await events
      .find({ services: { $in: [serviceId] }, org: org })
      .select({ _id: 1, name: 1, date: 1, address: {line1: 1} })
      .lean();
    res.json(eventsWithService);
  } catch (error) {
    next(error);
  }
});

// API endpoint to POST new event
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newEvent = req.body;
  newEvent.org = org;
  events.create(newEvent, (error, data) => {
    if (error) {
      return next(error);
    } else {
      const message = { success: true, message: "New event created successfully" };
      res.status(201).json(message);
    }
  });
});

// API endpoint to PUT -> update event
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndUpdate({ _id: req.params.id, org: org }, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      const message = { success: true, message: "Event updated successfully" };
      res.status(201).json(message);
    }
  });
});

// API endpoint to PUT -> add attendee to event
router.put('/register', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.find(
    { _id: req.query.event, attendees: req.query.client, org: org },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        // only add attendee if not yet signed up
        if (!data.length) {
          events.findByIdAndUpdate(
            req.query.event,
            { $push: { attendees: req.query.client } },
            (error, data) => {
              if (error) {
                console.log(error);
                return next(error);
              } else {
                res.send('Client added to event');
              }
            }
          );
        } else {
          res.status(400).send('Client already added to event');
        }
      }
    }
  );
});

// API endpoint to PUT -> remove attendee from event
router.put('/deregister', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findByIdAndUpdate(
    req.query.event,
    { $pull: { attendees: req.query.client } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.send('Client deregistered with event');
      }
    }
  );
});

// API endpoint called when service is inactive, remove service from all events
router.put('/remove-service-all/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const serviceId = req.params.id;
  events.updateMany(
    { org: org, services: serviceId },
    { $pull: { services: serviceId } }
  )
  .then(() => {
    const message = { success: true, message: "Service removed from all events in the org" };
    res.status(200).json(message);
  })
  .catch(error => {
    console.log(error);
    return next(error);
  });
});

// API endpoint to hard DELETE event by ID, as per project specifications
router.delete('/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndDelete({ _id: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Event not found');
    } else {
      const message = { success: true, message: "Event deleted successfully" };
      res.status(201).json(message);
    }
  });
});

module.exports = router;
