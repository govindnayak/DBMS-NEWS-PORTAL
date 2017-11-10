var app = angular.module("myApp");

app.controller('loginController', function($scope, $location, $http, $window) {
  $scope.main = "Login";
  $window.localStorage["loggedin"] = false;
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

app.controller('adminController', function($scope,$http, $window, $resource, $route ,$location ){
  $scope.main="admin";
  $scope.catid = $window.localStorage["value"];
  $window.localStorage["loggedin"] = true;

//  $window.localStorage["loggedin"] = true;
  $scope.addnews = function() {
    $http({
      url: '/admin',
      method: 'post',
      data: {
        "headline": $scope.headline,
        "content": $scope.content,
        "image": $scope.image,
        "adminname": $window.localStorage["value"]
      }
    }).then(function(data) {
      if(data.data.success) {
        alert("Succes!");
        $location.path('/home');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }

  $scope.deletenews = function(deleteheadline) {
    $http({
      url: '/delete',
      method: 'post',
      data: {
        "deleteheadline": deleteheadline,
        "adminname": $window.localStorage["value"]
      }
    }).then(function(data) {
      if(data.data.success) {
        alert("Succes!");
        $location.path('/admin');
      }
      else {
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

app.controller('feedbackController', function($scope,$http, $window, $resource, $route ,$location ){
  $scope.main="feedback";

  $scope.feedback = function() {
    $http({
      url: '/feedback',
      method: 'post',
      data: {
        "email": $scope.email,
        "phone": $scope.phone,
        "comment": $scope.comment,
        "line": $scope.line,
        "correction": $scope.correction
      }
    }).then(function(data) {
      if(data.data.success) {
        alert("Thank you!");
        $location.path('/home');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});

app.controller('politicsController', function($scope,$http, $resource, $route) {
  $scope.main = "Politics";
  var test = {};
  var info=$resource('/politics');
  info.query(function(result){
          $scope.feed = result;
     })
});

app.controller('technologyController', function($scope,$http, $resource, $route) {
  $scope.main = "Technology";
  var test = {};
  var info=$resource('/technology');
  info.query(function(result){
          $scope.feed = result;
     })
});
app.controller('businessController', function($scope,$http, $resource, $route) {
  $scope.main = "Business";
  var test = {};
  var info=$resource('/business');
  info.query(function(result){
          $scope.feed = result;
     })
});
app.controller('sportsController', function($scope,$http, $resource, $route) {
  $scope.main = "Sports";
  var test = {};
  var info=$resource('/sports');
  info.query(function(result){
          $scope.feed = result;
     })
});
app.controller('moviesController', function($scope,$http, $resource, $route) {
  $scope.main = "Movies";
  var test = {};
  var info=$resource('/movies');
  info.query(function(result){
          $scope.feed = result;
     })
});
app.controller('internationalController', function($scope,$http, $resource, $route) {
  $scope.main = "International";
  var test = {};
  var info=$resource('/international');
  info.query(function(result){
          $scope.feed = result;
     })
});

app.controller('logoutController', function($scope,$location){
  $scope.logout = function(){
      //Just clear values from scope

      Session.clear();
      $location.path('/home');

  }
});
