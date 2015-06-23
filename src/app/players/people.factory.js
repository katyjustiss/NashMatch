angular
  .module('NashMatch')

  .factory('Profile', function($http, FIRE_URL) {
    return {
      create(data, uid, cb) {
        $http
          .put(`${FIRE_URL}/profile/${uid}.json`, data)
          .success(cb);
      },
      allPlayers(cb) {
        $http
          .get(`${FIRE_URL}/profile.json`)
          .success(cb)
      }

    }//end return

  })
