angular
  .module('NashMatch')

  .controller('AuthCtrl', function($rootScope, $scope, $location, FIRE_URL, People) {
    var main = this;
    var fb = new Firebase(FIRE_URL)

    main.login = function (email, password) {
      fb.authWithPassword({
        email: email,
        password: password
      }, function (err, authData) {
        if (err) {
          console.log('Error', err)
        } else {
          $rootScope.auth = authData; //setting authData on rootscope after login
          $('#modal').modal('hide'); //may need to tweak
          $location.path('/players'); //make sure this is added
          $scope.$apply();
        }
      });
    }; //end of login

    main.createUser = function() {
      fb.createUser({
        email: main.hidden.email,
        password: main.hidden.password
      }, function(err, userData){
        if(err){
          console.log('Firebase err:'+err);
        }else{
          People.create(main.person, userData.uid, function(){
            main.login(main.hidden.email, main.hidden.password);
          })
        }
      }); //end of fb createUser
    }; //end of createUser function

     main.onModalLoad = function(){
      $('#modal').modal('show');
      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path('/login');
        $scope.$apply();
      });
    } //end of ModalLoad

  })
