var app = angular.module("myApp", ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'homeController'
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'adminController'
  })
  .when('/articles/:id', {
    templateUrl: 'views/articles.html',
    controller: 'articleController'
  })
  .when('/logout', {
    resolve: {
      redirect: function(Session){
            Session.clear();
            return "/home";
    }}})
  .otherwise({
    redirectTo: '/home'
  })
});


app.controller('mainController', function($scope) {
  $scope.main = "Main";
});
