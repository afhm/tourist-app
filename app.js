var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');


var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var path = require('path');
var cookieParser = require('cookie-parser');
var  passport = require('passport');

var usersRouter = require('./routes/admin');
var app = express();
//load routes
var places = require('./routes/places');
var admin = require('./routes/admin');
var contacts = require('./routes/contact');
var adminprofile = require('./routes/adminprofile');

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


app.use(flash());

//global variables
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//home route
app.get('/', (req, res) => {
  res.render('index');
});

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));


app.use(cookieParser());

//for static assets public folder
app.use(express.static(path.join(__dirname, 'public')));


// connect to mongoose
mongoose.connect('mongodb://localhost:27017/tourist', {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));


//use external routes
app.use('/admin', admin);
app.use('/places', places);
app.use('/contact', contacts);
app.use('/adminprofile', adminprofile);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });





// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;