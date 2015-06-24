angular
  .module('NashMatch')

  .factory('People', function($http, FIRE_URL) {
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
      },
      getOne(id, cb){
        $http
          .get(`${FIRE_URL}/profile/${id}.json`)
          .success(cb);
      },
      getProfile(uid, cb){
        $http
          .get(`${FIRE_URL}/profile/${uid}.json`)
          .success(cb)
      },


    }//end return

  })
