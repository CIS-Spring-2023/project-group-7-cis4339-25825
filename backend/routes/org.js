const express = require('express')
const router = express.Router()
const authMiddleWare = require('../auth/authMiddleWare')

// importing data model schemas
const { orgs } = require('../models/models')

// checked
// GET org
router.get('/', authMiddleWare, (req, res, next) => {
  const org = req.user.org;
  orgs.findById(org, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
