angular
  .module('NashMatch')

  .controller('PlayerCtrl', function(People, FIRE_URL) {
    var main = this;

    People.allPlayers(function(people){
      //gets all users and gives to ng-repeat
      main.people = people;
    })

  })
