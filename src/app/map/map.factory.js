angular
  .module('NashMatch')

  .factory('Map', function($http, FIRE_URL) {
    return {
      getAllParks(cb) {
        $http
          .get(`${FIRE_URL}/parks.json`)
          .success(cb);
      }
    }

  })
