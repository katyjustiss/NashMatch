angular
  .module('NashMatch')

  .config(function($routeProvider) {
    $routeProvider
      .when('/players', {
        templateUrl: '/app/players/players.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player',
        private: true
      })
      .when('/people/:id', {
        templateUrl: '/app/players/player.html',
        controller: 'PersonCtrl',
        controllerAs: 'player',
        private: true
      })
      .when('/profile', {
        templateUrl: '/app/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        private: true
      })

  })
