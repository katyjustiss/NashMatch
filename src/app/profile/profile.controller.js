angular
  .module('NashMatch')
  .controller('ProfileCtrl', function($rootScope, FIRE_URL, $location, People, $scope) {
    var main = this;

    var fb = new Firebase(FIRE_URL);
    var userData = fb.getAuth();
    main.id = userData.uid;

    People.getProfile($rootScope.auth.uid, function(person) {
      main.person = person;
      console.log(main.person)
    })

    main.editModalLoad = function(){
      $('#modal').modal('show');
      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path('/profile');
        $scope.$apply();
      });
    } //end of ModalLoad

    main.editUser = function() { //may just be able to do put request?
      People.create(main.person, userData.uid, function(){
        $('#modal').modal('hide');
        $location.path("/profile")
      })
    }
  })
