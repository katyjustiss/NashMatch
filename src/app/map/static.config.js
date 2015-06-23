angular
  .module('NashMatch')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl',
        controllerAs: 'home'
      })
  });
