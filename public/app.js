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
  .when('/editor', {
    templateUrl: 'views/pages/editor.html',
    controller: 'editorController'
  })
  .when('/polls', {
    templateUrl: 'views/pages/poll.html'
  })
  .when('/pollresults', {
    templateUrl: 'views/pages/pollresults.html',
    controller: 'pollController'
  })
  .when('/politics', {
    templateUrl: 'views/pages/politics.html',
    controller: 'politicsController'
  })
  .when('/technology', {
    templateUrl: 'views/pages/technology.html',
    controller: 'technologyController'
  })
  .when('/business', {
    templateUrl: 'views/pages/business.html',
    controller: 'businessController'
  })
  .when('/sports', {
    templateUrl: 'views/pages/sports.html',
    controller: 'sportsController'
  })
  .when('/movies', {
    templateUrl: 'views/pages/movies.html',
    controller: 'moviesController'
  })
  .when('/international', {
    templateUrl: 'views/pages/international.html',
    controller: 'internationalController'
  })
  .when('/feedback', {
    templateUrl: 'views/pages/feedback.html',
    controller: 'feedbackController'
  })
  .when('/aboutus', {
    templateUrl: 'views/pages/about.html',
  })
  .when('/suggestededits', {
    templateUrl: 'views/pages/suggestededits.html',
    controller: 'suggestededitsController'
  })
  .otherwise({
    redirectTo: '/home'
  })
});
