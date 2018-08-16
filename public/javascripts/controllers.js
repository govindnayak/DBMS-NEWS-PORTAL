var app = angular.module("myApp");


app.controller('loginController', function($scope, $location, $http, $window) {
  $scope.main = "Login";
  $scope.username = "";
  $scope.password = "";
    $scope.check = function() {
      if($window.localStorage.value)
        return true;
      else {
        return false;
      }
    }

    $scope.edit_list_check = function() {
      if($window.localStorage.role == 'editor')
        return true;
      else {
        return false;
      }
    }

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
          $window.localStorage["value"] = $scope.username;
          if($scope.permission == 'A'){
            $window.localStorage['role'] = 'admin';
            $location.path('/admin');
          }
          else if($scope.permission == 'E'){
          $window.localStorage['role'] = 'editor';
          $location.path('/editor');
          }
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }

  $scope.logout = function() {
    $window.localStorage.clear();
    alert('You have been successfully logged out');
    $location.path('/home');
    location.reload();
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
  if($window.localStorage.value && $window.localStorage.role == 'admin')
    $location.path('/admin');
  else {
    $location.path('/home');
    alert('Please complete login before accessing this page');
  }

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
        $location.path('/admin');
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});

app.controller('editorController', function($scope,$http, $window, $resource, $route ,$location ){
  $scope.main="editor";
  $scope.editor = {};
  if($window.localStorage['value'] && $window.localStorage.role == 'editor')
    $location.path('/editor');
  else {
    $location.path('/home');
    alert('Please complete login before accessing this page');
  }
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
           location.reload();
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

     $scope.editnews = function(a) {
       $http({
         url: '/edit',
         method: 'post',
         data: {
           "editaid": a.newaid,
           "editheadline": a.newheadline,
           "editcontent": a.newcontent,
           "editimage": a.newimage
         }
       }).then(function(data) {
         if(data.data.success) {
           alert("Succes!");
            $location.path('/editor');
            location.reload();
         }
         else {
           alert(data.data.message);
         }
       }, function(err){})
     }

     $scope.loadtext = function(x){
       $scope.editor.newheadline= x.headline;
       $scope.editor.newcontent = x.content;
       $scope.editor.newimage = x.img_url;
       $scope.editor.newaid = x.aid;
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
  $scope.questions = [{
    question: "Are you registered to vote as a Republican, Democrat, Independent or something else?",
    choices: ["Republican", "Democrat", "Independent", "Others"],

  }, {
    question: "Which age group do you belong to?",
    choices: ["18 to 29 years", "30 to 44 years", "45 to 59 years", "60+ years"],

  }, {
    question: "On what scale would you like to rate the effects of DEMONITIZATION?",
    choices: ["Excellent", "Good", "Satisfactory", "Very bad"],
    correctAnswer: 0
  }, {
    question: "Do you think the implementation of GST has been beneficial to the Indian economy?",
    choices: ["Yes", "No", "Don't know"],

  }, {
    question: "Who do you think will become the next prime minister of India?",
    choices: ["Narendra Modi", "Rahul Gandhi", "Nitish Kumar", "Aravind Kejriwal"],

  }];
  var que = $scope.questions;


  var info=$resource('/pollresults');
  info.query(function(result){
          $scope.feed = result;
          var f = $scope.feed;
          // alert(f);
          for(var i=0;i<f.length;i++)
          {
            // alert(JSON.stringify(f[i]));
            var res = Math.max(f[i].op1,f[i].op2,f[i].op3,f[i].op4)
            f[i].result = res;

          }
          for(var i=0;i<que.length;i++)
          {
            f[i].question = que[i];
          }
     })


  $scope.update = function (arr) {
    alert("Here it comes")
    alert(JSON.stringify(arr));
  }
});


app.controller('suggestededitsController', function($scope, $window, $http, $resource, $route, $location) {
  if(!($window.localStorage.role == 'editor')) {
    alert('Please complete login before accessing this page');
    $location.path('/home');
  }

  var info = $resource('/suggestededits');
  info.query(function(result){

    $scope.feed = result;
    var f = $scope.feed;
    for(var i=0;i<f.length;i++)
    {
      //alert(JSON.stringify(f[i].comments));
      var str = f[i].comments;
      var n = str.search("Good");
      if(!n)
        alert(f[i].comments);
      }

    })


  $scope.done = function(id) {
    $http({
      url: '/done',
      method: 'post',
      data: {
        "id": id
      }
    }).then(function(data) {
      if(data.data.success) {
        alert("Correction registered as done");
        $route.reload();
      }
      else {
        alert(data.data.message);
      }
    }, function(err){})
  }
});
