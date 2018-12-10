var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var  passport = require('passport');
var app = express();


//load routes
var places = require('./routes/places');
var admin = require('./routes/admin');
var contacts = require('./routes/contact');
var adminprofile = require('./routes/adminprofile');

//DB config
const db =require('./config/database');

//passport config
require('./config/passport')(passport);

// view engine setup
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// add body parser middle ware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//method override for put request
app.use(methodOverride('_method'));

//express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//flash error message middleware
app.use(flash());

//global variables
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// home route
app.get('/', (req, res) => {
  res.redirect('places/allplaces');
});

//for static assets public folder
app.use(express.static(path.join(__dirname, 'public')));


// connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));


//use external routes
app.use('/', admin);
app.use('/admin', admin);
app.use('/places', places);
app.use('/contact', contacts);
app.use('/adminprofile', adminprofile);

module.exports = app;