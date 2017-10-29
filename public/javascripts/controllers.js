var app = angular.module("myApp");

app.controller('loginController', function($scope, $location, $http, $window) {
  $scope.main = "Login";


  $scope.username = "";
  $scope.password = "";

  $scope.login = function() {
    $http({
      url: '/login',
      method: 'post',
      data: {
        "username": $scope.username,
        "password": $scope.password
      }
    }).then(function(data) {
      if(data.data.success) {
        $scope.isLoggedin = true;
        $window.localStorage["value"] = $scope.username;
        $location.path('/admin');
      }
      else {
        $scope.isLoggedin = false;
        alert(data.data.message);
      }
    }, function(err){})
  }
});

app.controller('homeController', function($scope,$http, $resource, $route) {
  $scope.main = "Home";
  var test = {};
  var info=$resource('/home');
  info.query(function(result){
          $scope.feed = result;
     })
});

app.controller('adminController', function($scope,$http, $window, $resource, $route){
  $scope.main="admin";

  $scope.addnews = function() {
    $http({
      url: '/admin',
      method: 'post',
      data: {
        "newsid": $scope.newsid,
        "date": $scope.date,
        "headline": $scope.headline,
        "content": $scope.content,
        "category": $scope.category,
        "adminname": $window.localStorage["value"]
      }
    }).then(function(data) {
      if(data.data.success) {

        $location.path('/admin');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});

app.controller('articleController', function($scope,$http, $routeParams, $resource, $route) {
  $scope.main = "Articles";
  var test = {};
  var info=$resource('/articles/:id');
  info.query(function(result){
          $scope.feed = result;
     })
});
