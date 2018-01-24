// public/core.js
var techbrainTodo = angular.module('techbrainTodo', []);

function mainController($scope, $http){
  $scope.formData = {};

  // when landing on the page get all todos and show them

  $http.get('/api/getalltodos')
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
          console.log('Error: '+data);
        });

  // when submitting the add form, send the text to the API

  $scope.createTodo = function(){
        $http.post('/api/createtodos', $scope.formData)
              .success(function(data){
                  $scope.formData = {} // clear the form so user get refreshed box
                  $scope.todos = data;
                  console.log(data);
              })
              .error(function(data){
                  console.log('Error: '+ data);
              });
          };

  // delete a todo after checking it exist in the data base

  $scope.deleteTodo = function(id){
        $http.delete('/api/deletetodos/' + id)
              .success(function(data){
                $scope.todos = data;
                console.log(data);
              })
              .error(function(data){
                console.log('Error: '+ data);
              });
          };
}
