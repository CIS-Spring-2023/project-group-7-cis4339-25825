const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)

// collection for users
const userDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    orgs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'users'
  }
)

// collection for clients
const clientDataSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    orgs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'clients'
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    org: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'events'
  }
)

// collection for services
const serviceDataSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    },
    orgs: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    collection: 'services'
  }
)

// create models from mongoose schemas
const clients = mongoose.model('clients', clientDataSchema)
const users = mongoose.model('users', userDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('events', eventDataSchema)
const services = mongoose.model('services', serviceDataSchema)

// package the models in an object to export
module.exports = { clients, orgs, events, users }
