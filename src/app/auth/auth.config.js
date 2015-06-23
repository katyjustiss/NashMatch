angular
  .module('NashMatch')
  .config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: '/app/auth/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/logout', {
        template: '<h1>Logging out...</h1>',
        controller: 'LogoutCtrl',
        controllerAs: 'auth'
      })
    })
