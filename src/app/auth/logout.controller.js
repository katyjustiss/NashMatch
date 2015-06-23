angular
  .module('NashMatch')

  .controller('LogoutCtrl', function ($rootScope, $scope, $location, FIRE_URL) {
    var fb = new Firebase(FIRE_URL);

    fb.unauth(function () {
      $rootScope.auth = null;
      $location.path('/login');
      $scope.$apply();
    });
  });
