//server.js

/// starting mongodb in mac
//* brew services start mongodb
//Then access the shell by

//* mongo
//You can shut down your db by

//* brew services stop mongodb
// For more options

//brew info mongodb

// mongodb in Windows http://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows



  // set up ===============================================================================================
  var express = require('express');
  var app = express(); // create our app w/ express
  var mongoose = require('mongoose'); // mongoose for mongodb ORM
  var morgan = require('morgan');             // log requests to the console (express4)
  var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
  var database = require('./config/database'); 			// load the database config

  // configuration =============================================================================================


    mongoose.connect(database.url); 	// connect to mongoDB database
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start our web app with node server.js) ============================================================================
    app.listen(9090, function () {
      console.log("App Listening on port 9090");
    });
   

    // routes ======================================================================
    require('./app/routes.js')(app);
