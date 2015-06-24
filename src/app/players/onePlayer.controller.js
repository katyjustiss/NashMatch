angular
  .module('NashMatch')
  .controller('PersonCtrl', function(People, $routeParams){
    var main = this;
    main.id = $routeParams.id; //storing the id
    //var fb = new Firebase(FIRE_URL); //creating new firebase instance to access authData

    People.getOne(main.id, function(data){
      main.person = data;
    });

  });

