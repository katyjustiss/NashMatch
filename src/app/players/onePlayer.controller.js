angular
  .module('NashMatch')
  .controller('PersonCtrl', function(People, $routeParams, FIRE_URL, $location){
    var main = this;
    main.id = $routeParams.id; //storing the id
    var fb = new Firebase(FIRE_URL); //creating new firebase instance to access authData
    var userData = fb.getAuth();
    main.userData = userData.uid;

    //access one person's data for their profile
    People.getOne(main.id, function(data){
      main.person = data;
    });

    //function to add players and post them to firebase.
    main.savePlayer = function(){
      People.addPlayer(userData.uid, main.id, function(res){
        $location.path('/players');
        // $scope.$apply();
      });
    }

    //checking your players and disabling button if already added or if it is your own profile.
    People.getPlayers(userData.uid, function(res){ //res is friend list form firebase
      main.playerObj = res;
      for (var player in main.playerObj){ //player is the firebase obj code. main.playerObj is the simplelogin# and the firebase key
        if(main.playerObj[player] === main.id || userData.uid === main.id){ //After this step, main.id is the simplelogin#
          $('.add').attr('disabled', 'disabled');
        }
      }
    })

    //Adding comments to Firebase
    main.addComments = function() {
      //can get the one person's data for profile
      //add comment to their firebase info?
      //main.id is the simple login of the page
      //main.comment links to the textarea content
          //your info
      People.getOne(main.userData, function(info){
        main.info = info;

      var addingComments = fb.child(`comments/${main.id}`)
      .push({
        comment: main.comment,
        name: main.info.name,
        timestamp: Firebase.ServerValue.TIMESTAMP
      })
      //unfortunately repeated the function below. Want it to run aften adding on on page load.
      People.getComments(main.id, function(res){ //comment is obj with 2 objs
        main.commentObj = res;
        console.log(res)
        main.comments = [];
        for (var message in main.commentObj) {

          main.comments.push(main.commentObj[message]); //the individual comment objs with name
        }
      })

      }) //end of People.getOne
    } //end addComments

      //adding comments to the div
      People.getComments(main.id, function(res){ //comment is obj with 2 objs
        main.commentObj = res;
        console.log(res)
        main.comments = [];
        for (var message in main.commentObj) {

          main.comments.push(main.commentObj[message]); //the individual comment objs with name
        }
      })


  });

