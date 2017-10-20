var app = angular.module("myApp", ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'homeController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'signupController'
  })
  .otherwise({
    redirectTo: '/'
  })
});


app.controller('mainController', function($scope) {
  $scope.main = "Main";
});
