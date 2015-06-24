angular
  .module('NashMatch')
  .controller('PersonCtrl', function(People, $routeParams, FIRE_URL, $location){
    var main = this;
    main.id = $routeParams.id; //storing the id
    var fb = new Firebase(FIRE_URL); //creating new firebase instance to access authData
    var userData = fb.getAuth();

    //access one person's data for their profile
    People.getOne(main.id, function(data){
      main.person = data;
    });

    //function to add players and post them to firebase.
    main.savePlayer = function(){
      People.addPlayer(userData.uid , main.id, function(res){
        $location.path('/players');
        // $scope.$apply();
      });
    }

    //checking your players and disabling button if already added or if it is your own profile.
    People.getPlayers(userData.uid, function(res){
      main.playerObj = res;
      for (var player in main.playerObj){
        if(main.playerObj[player] === main.id || userData.uid === main.id){
          $('.btn').attr('disabled', 'disabled');
        }
      }
    })

  });

