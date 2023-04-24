const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { events, clients } = require('../models/models');

// checked
// GET 10 most recent events for all orgs
router.get('/all', (req, res, next) => {
  console.log('events/all endpoint')
  events
    .find({}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log('data:', data);
        return res.json(data);
      }
    })
    // sort by date descending
    .sort({ date: -1 })
    .limit(10);
});

// checked
// GET all events for org
router.get('/all/org', authMiddleWare, (req, res, next) => {
  const org = req.user.org;  
  events
    .find({ org: org }, { _id: 1, name: 1, date: 1, attendees: 1 }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log('data:', data);
        return res.json(data);
      }
    })
});


// checked
// GET 10 most recent events for org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;  
  events
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log('data:', data);
        return res.json(data);
      }
    })
    // sort by date descending
    .sort({ date: -1 })
    .limit(10);
});

// checked
// GET single event by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  // use findOne instead of find to not return array
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

// checked
// GET events based on search query
// Ex: '...?name=Food&searchBy=name'
router.get('/search/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const dbQuery = { org: org };
  switch (req.query.searchBy) {
    case 'name':
      // match event name, no anchor
      dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' };
      break;
    case 'date':
      dbQuery.date = req.query.eventDate;
      break;
    default:
      return res.status(400).send('invalid searchBy');
  }
  console.log('search events API endpoint dbQuery', dbQuery)
  events.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// GET events for which a client is signed up
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

// checked
// GET events for which a client is not signed up
router.get('/client/:id/not-registered', authMiddleWare, async (req, res, next) => {
  const org = req.user.org;
  try {
    const eventsNotRegistered = await events.find({ attendees: { $nin: [req.params.id] }, org: org });
    res.json(eventsNotRegistered);
  } catch (error) {
    next(error);
  }
});

// checked
// GET all attendees for an event
router.get('/attendees/:id', authMiddleWare, (req, res, next) => {
  const eventId = req.params.id;
  events.findById(eventId, (error, event) => {
    console.log('event found')
    if (error) {
      return next(error);
    } else {
      console.log('event.attendees', event.attendees)
      const attendeeIds = event.attendees.map(attendee => attendee.toString());
      console.log('attendeeIds', attendeeIds)
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

// checked
// GET all events for a given service
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





// checked
// GET org event attendance for the past two months
router.get('/attendance', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  events
    .find({ org: org, date: { $gte: twoMonthsAgo } }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    })
    .sort({ date: 1 });
});

// checked
// POST new event
router.post('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  const newEvent = req.body;
  newEvent.org = org;
  events.create(newEvent, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // res.json(data);
      const message = { success: true, message: "New event created successfully" };
      res.status(201).json(message);
    }
  });
});

// checked
// PUT update event
router.put('/update/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndUpdate({ _id: req.params.id, org: org }, req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // res.json(data);
      const message = { success: true, message: "Event updated successfully" };
      res.status(201).json(message);
    }
  });
});


// checked
// PUT add attendee to event
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

// checked
// PUT remove attendee from event
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

// checked
// GET events for which a service is assigned
router.get('/service/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.find({ services: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// checked
// PUT add service to event
router.put('/add-service/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndUpdate(
    { _id: req.params.id, org: org },
    { $addToSet: { services: req.body.serviceId } },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send('Service added to event');
      }
    }
  );
});

// checked
// PUT remove service from event
router.put('/remove-service/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndUpdate(
    { _id: req.params.id, org: org },
    { $pull: { services: req.body.serviceId } },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send('Service removed from event');
      }
    }
  );
});

// checked
// hard DELETE event by ID, as per project specifications
router.delete('/:id', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  events.findOneAndDelete({ _id: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Event not found');
    } else {
      res.send('Event deleted');
    }
  });
});

module.exports = router;
