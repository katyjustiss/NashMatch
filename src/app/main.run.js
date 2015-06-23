angular
  .module('NashMatch')
  .run(function ($rootScope, $location, FIRE_URL) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      var fb = new Firebase(FIRE_URL);
      $rootScope.auth = fb.getAuth();

      if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
        $location.path('/login')
      }
    });
  })
