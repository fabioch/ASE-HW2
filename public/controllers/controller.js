var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/carlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.carlist = response;
    $scope.car = "";
  });
};

refresh();

$scope.addCar = function() {
  console.log($scope.car);
  $http.post('/carlist', $scope.car).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/carlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/carlist/' + id).success(function(response) {
    $scope.car = response;
  });
};  

$scope.update = function() {
  console.log($scope.car._id);
  $http.put('/carlist/' + $scope.car._id, $scope.car).success(function(response) {
    refresh();
  });
};

$scope.deselect = function() {
  $scope.car = "";
};

}]);