angular
  .module('NashMatch')

  .config(function($routeProvider) {
    $routeProvider
      .when('/players', {
        templateUrl: '/app/players/players.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player'
      })

  })
