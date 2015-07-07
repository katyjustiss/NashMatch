angular
  .module('NashMatch')
  .controller('ProfileCtrl', function($rootScope, FIRE_URL, $location, People, $scope) {
    var main = this;

    var fb = new Firebase(FIRE_URL);
    var userData = fb.getAuth();
    main.id = userData.uid;
    main.playerProfile = [];
    main.playerID = [];

    People.getProfile($rootScope.auth.uid, function(person) {
      main.person = person;
    })

    main.editModalLoad = function(){
      $('#modal').modal('show');
      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path('/profile');
        $scope.$apply();
      });
    } //end of ModalLoad

    main.editUser = function() {
      People.create(main.person, userData.uid, function(){
        $('#modal').modal('hide');
        $location.path("/profile")
      })
    }

    //working on creating a link back to their profile pages.
    People.getPlayers(userData.uid, function(res) {
      main.playerObj = res; //accessing the simplelogin friend info
      for (var player in main.playerObj) {
        main.playerID.push(main.playerObj[player])
        People.getOne(main.playerObj[player], function(saved) {
          main.playerProfile.push(saved)
        })
      }
    })

  })
