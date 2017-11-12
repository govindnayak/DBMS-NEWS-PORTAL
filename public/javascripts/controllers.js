var app = angular.module("myApp");


app.controller('loginController', function($scope, $location, $http, $window) {
  $scope.main = "Login";
  $scope.username = "";
  $scope.password = "";
  $scope.isLoggedin = false;
  $scope.login = function() {
    $http({
      url: '/login',
      method: 'post',
      data: {
        "username": $scope.username,
        "password": $scope.password,
        "permission": $scope.permission
      }
    }).then(function(data) {
      if(data.data.success) {
        $scope.isLoggedin = true;
        $('#login').hide();
        $window.localStorage["value"] = $scope.username;
        if($scope.permission == 'A')
          $location.path('/admin');
        else if($scope.permission == 'E')
          $location.path('/editor');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }

  $scope.logout = function(){
    $scope.isLoggedin = false;
    $location.path('/home');
    alert("You have successfully logged out!")
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
});

app.controller('editorController', function($scope,$http, $window, $resource, $route ,$location ){
  $scope.main="editor";

  var test = {};
  var info=$resource('/editor');
  info.query(function(result){
          $scope.feed = result;
     })

     $scope.deletenews = function(x) {
       $http({
         url: '/delete',
         method: 'post',
         data: {
           "deleteheadline": x.headline
         }
       }).then(function(data) {
         if(data.data.success) {
           alert("Succes!");
           $location.path('/editor');
         }
         else {
           alert(data.data.message);
         }
       }, function(err){})
     }

     $scope.approvenews = function(x) {
       $http({
         url: '/approve',
         method: 'post',
         data: {
           "appheadline": x.headline
         }
       }).then(function(data) {
         if(data.data.success) {
           alert("Succes!");
           $location.path('/editor');
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


app.controller('pollController', function($scope,$http, $window, $resource, $route ,$location ){
  $scope.main="Polling";

  $scope.feedback = function() {
    $http({
      url: '/polls',
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
        $location.path('/polls');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});
