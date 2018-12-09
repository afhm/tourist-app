const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load helper
var {
  ensureAuthenticated
} = require('../helpers/auth');


// load place model
require('../models/places');
var Place = mongoose.model('places');

// get all places route
router.get('/allPlaces', (req, res) => {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Place.find({title:regex})
      .then(places => {
        res.render('index', {
          places: places
        });
      });

  } else {
    Place.find({})
      .then(places => {
        res.render('index', {
          places: places
        });
      });
  }
});






// places route
router.get('/', ensureAuthenticated, (req, res) => {
  Place.find({})
    .then(places => {
      res.render('places/index', {
        places: places
      });
    });

});








// Get Single place
router.get('/indplace/:id', function (req, res) {
  Place.findOne({
      _id: req.params.id
    })
    .then(place => {
      res.render('places/indplace', {
        place: place
      });
    });
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('places/add');
});

// edit place
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Place.findOne({
      _id: req.params.id
    })
    .then(place => {
      res.render('places/edit', {
        place: place
      });
    });

});


router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({
      text: 'Please add title'
    });
  }
  if (!req.body.desc) {
    errors.push({
      text: 'Please add description'
    });
  }

  if (errors.length > 0) {
    res.render('places/add', {
      errors: errors,
      title: req.body.title,
      description: req.body.desc,
      imagePath: req.body.imagePath
    });

  } else {
    const newUser = {
      title: req.body.title,
      description: req.body.desc,
      imagePath: req.body.imagePath
    }
    new Place(newUser)
      .save()
      .then(place => {
        req.flash('success_msg', 'Location Added');
        res.redirect('/places')
      })

  }
});
router.put('/:id', ensureAuthenticated, (req, res) => {
  Place.findOne({
      _id: req.params.id
    })
    .then(place => {
      place.title = req.body.title;
      place.description = req.body.desc;
      place.save()
        .then(place => {
          req.flash('success_msg', 'Location updated');
          res.redirect('/places');
        })
    });
});

router.delete('/:id', ensureAuthenticated, (req, res) => {
  Place.remove({
      _id: req.params.id
    })
    .then(() => {
      req.flash('success_msg', 'Location removed');
      res.redirect('/places');
    });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;