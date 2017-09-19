// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require('path');
const assert = require('assert');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');

// set Mongoose promises to es6 promises
mongoose.Promise = Promise;
// Initialize Express Server
const app = express();
// Specify the port.
var port = process.env.PORT || 3000;

// Make public a static dir
app.use(express.static(__dirname + '/public'));

// setup template enging
var hbs = exphbs.create({
    defaultLayout: 'main',

    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', port);

// Use morgan for logs 
app.use(logger("dev"));
//body parser for routes our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//add cookie and session support
app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy

//need sessions to persist state of user
app.use(session({
  secret: '3or8h1o2h1o28u12o38j12',
  resave: false,
  saveUninitialized: true
}));
// MongoDB
var uri = 'mongodb://' + process.env.MLAB_USER + ':' + process.env.MLAB_PASS + '@ds135983.mlab.com:35983/devserver';

//connect to mongodb//set controllers and sockets here to have access to DB
mongoose.connect(uri).then(() => console.log('connected to DB!')).catch(err => console.log(err));

//set up passport for user authentication
const passportConfig = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

require("./controllers/auth-controller.js")(app);
require("./controllers/poll-controller.js")(app);
require("./controllers/vote-controller.js")(app, hbs);


// Listen on port 3000 or assigned port
const server = app.listen(port, function() {
    console.log(`App running on ${port}`);
});

// socket.io server for websockets
const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');

  //notify all but caller of new save
  socket.on('save-event', function(article) {
    console.log('Save called');
  	socket.broadcast.emit('new-save', {article});
  });

  //notify all but caller of delete
  socket.on('remove-event', function(article) {
    console.log('Remove called');
  	socket.broadcast.emit('new-delete', {article});
  });

  //notify all but caller of new vote
  socket.on('vote-event', function(article) {
    console.log('Vote called');
    socket.broadcast.emit('new-vote', {article});
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


});