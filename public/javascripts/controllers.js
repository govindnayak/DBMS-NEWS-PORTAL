var app = angular.module("myApp");

app.controller('loginController', function($scope, $location, $http) {
  $scope.main = "Login";


  $scope.username = "";
  $scope.password = "";

  $scope.login = function() {
    $http({
      url: '/login',
      method: 'get',
      data: {
        "username": $scope.username,
        "password": $scope.password
      }
    }).then(function(data) {
      if(data.data.success) {
        $location.path('/');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});

app.controller('homeController', function($scope) {
  $scope.main = "News Portal";

});



/*app.controller('signupController', function($scope) {
  $scope.main = "Register";
  $scope.register= function(){
    $http({
      url: '/register',
      method: 'post'
    })
  }
});*/
