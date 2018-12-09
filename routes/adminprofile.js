const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load contacts model
var {
  ensureAuthenticated
} = require('../helpers/auth');

require('../models/contact');
var Contact = mongoose.model('contacts');


//get all customer info
router.get('/', ensureAuthenticated, (req, res) => {
  Contact.find({})
    .then(contacts => {
      res.render('admin/profile', {
        contacts: contacts
      });
    });

});

module.exports = router;