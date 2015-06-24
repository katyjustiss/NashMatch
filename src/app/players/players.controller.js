angular
  .module('NashMatch')

  .controller('PlayerCtrl', function(Profile, FIRE_URL) {
    var main = this;

    Profile.allPlayers(function(people){
      //gets all users and gives to ng-repeat
      main.people = people;
    })

  })
