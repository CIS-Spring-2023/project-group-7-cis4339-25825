const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// const org = process.env.ORG
const org = mongoose.Types.ObjectId(process.env.ORG)

// importing data model schemas
const { events } = require('../models/models')

// checked
// GET 10 most recent events for org
router.get('/', (req, res, next) => {
  console.log('org:', org)
  events
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log("data:", data)
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ date: 1 })
    .limit(10)
})

// checked
// GET single event by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  events.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Event not found')
    } else {
      res.json(data)
    }
  })
})

// checked
// GET events based on search query
// Ex: '...?name=Food&searchBy=name'
router.get('/search/', (req, res, next) => {
  const dbQuery = { org: org }
  switch (req.query.searchBy) {
    case 'name':
      // match event name, no anchor
      dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' }
      break
    case 'date':
      dbQuery.date = req.query.eventDate
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  events.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// checked
// GET events for which a client is signed up
router.get('/client/:id', (req, res, next) => {
  events.find({ attendees: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// checked
// GET org event attendance for the past two months
router.get('/attendance', (req, res, next) => {
  const twoMonthsAgo = new Date()
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
  events
    .find({ org: org, date: { $gte: twoMonthsAgo } }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
    .sort({ date: 1 })
})

// checked
// POST new event
router.post('/', (req, res, next) => {
  const newEvent = req.body
  newEvent.org = org
  events.create(newEvent, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// checked
// PUT update event
router.put('/update/:id', (req, res, next) => {
  events.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// checked
// PUT add attendee to event
router.put('/register', (req, res, next) => {
  events.find(
    { _id: req.query.event, attendees: req.query.client },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        // only add attendee is not yet signed up
        if (!data.length) {
          events.findByIdAndUpdate(
            req.query.event,
            { $push: { attendees: req.query.client } },
            (error, data) => {
              if (error) {
                console.log(error)
                return next(error)
              } else {
                res.send('Client added to event')
              }
            }
          )
        } else {
          res.status(400).send('Client already added to event')
        }
      }
    }
  )
})

// checked
// PUT remove attendee from event
router.put('/deregister', (req, res, next) => {
  events.findByIdAndUpdate(
    req.query.event,
    { $pull: { attendees: req.query.client } },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        res.send('Client deregistered with event')
      }
    }
  )
})

// GET events for which a service is assigned
router.get('/service/:id', (req, res, next) => {
  events.find({ services: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// PUT add service to event
router.put('/add-service/:id', (req, res, next) => {
  events.findByIdAndUpdate(
    req.params.id,
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

// PUT remove service from event
router.put('/remove-service/:id', (req, res, next) => {
  events.findByIdAndUpdate(
    req.params.id,
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
router.delete('/:id', (req, res, next) => {
  events.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Event not found')
    } else {
      res.send('Event deleted')
    }
  })
})

module.exports = router
