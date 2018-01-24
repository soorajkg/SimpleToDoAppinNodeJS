
// This is Test application may contain some bugs please bear with me
//
//
//
var Todo = require('./models/todo');


//routes =================================================================================================================
module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/getalltodos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);

      res.json(todos); // return all todos in JSON format
    });
  });

  // create todo and send back all todos after creation
  app.post('/api/createtodos', function(req, res) {

    // create a new todo item, information comes from AJAX request from Angular
    Todo.create({
      text : req.body.text,
      done : false,
      date : Date.now()
    }, function(err, todo) {
      if (err)
        res.send(err);

      console.log("########### callback response after creating new item todo ###########");
      console.log(todo);
      console.log("#######################################################################");

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);

        res.json(todos);
      });
    });

  });

  //TODO 

  

  // delete a todo
  app.delete('/api/deletetodos/:todo_id', function(req, res) {
    console.log(req);
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);
      console.log("########### callback response after deleting  item todo ###########");
      console.log(todo);
      console.log("#######################################################################");

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  // application -------------------------------------------------------------
  app.get('/api/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
