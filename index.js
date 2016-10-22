var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var application = express();
var cors = require('cors');
const dotenv = require('dotenv');
const chalk = require('chalk');
const mongoose = require('mongoose');

// controllers
const auth = require('./src/auth');
const reports = require('./src/reports');


// Load env
dotenv.load({path: '.env'});

application.use(cors());
application.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});


application.use(function(err, req, res, next) {
  if (err.status != 404) {
    console.log(err.message);
    res.status(err.status || 500).send(err.api_message || 'Something broke.');
  } else {
    res.status(404);
    res.send(err.message || 'URL or page not found');
  }
});

// Routes
application.post('/login', auth.login);
application.post('/signup', auth.signup);
application.post('/reports', reports.reportPersons);
application.get('/hl_users', reports.searchUsers);


// if (process.env.NODE_ENV = 'production') {
//   console.log(process.env.NODE_ENV);

//   var fs = require('fs');
//   var https = require('https');
//   var ssl = {
//     key: fs.readFileSync('./ssl/server.key', 'utf8'),
//     cert: fs.readFileSync('./ssl/server.crt', 'utf8'),
//     ca: [fs.readFileSync('./ssl/gd1.crt', 'utf8'),
//     fs.readFileSync('./ssl/gd2.crt', 'utf8'),
//     fs.readFileSync('./ssl/gd3.crt', 'utf8')]
//   };
//   https.createServer(ssl, application).listen(1392);

// } else {
  console.log(process.env.NODE_ENV);
  var server = http.Server(application);


  server.listen(8080, function() {
    console.log('listening on port 8080');
  });
// }

// For testing.
exports.app = application;
