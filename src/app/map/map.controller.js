angular
  .module('NashMatch')
///////////Angular-google-map dependency using our key//////////
  .config(function(uiGmapGoogleMapApiProvider) {
     uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBw5V_cC244FX72P7x4a7ABmXOsZTnFSO4',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
     });

    })

//////////New Map///////////////
  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, FIRE_URL, Map) {
    var vm = this;
    var map;
    var markers = [];
    //Creating map
    uiGmapGoogleMapApi.then(function(maps) {
      $scope.map     = {
          center: {
            latitude: 36.1565338,
            longitude: -86.7769905
          },
          zoom: 11
      };
      $scope.options = { scrollwheel: false };

      $scope.tennisMarkers = [];


      //getting park info from Firebase
      Map.getAllParks(function(data) {
        var publicParkInfo = data; //An object with all the park objects

          var parkArr = [];
          //Pushes the park objs into an array that I can loop through
          for (var park in publicParkInfo) {
            parkArr.push(publicParkInfo[park])
          }

          //Looping through each park obj
          parkArr.forEach(function(entry, i) {
            // console.log(entry) //entry is the individual parks
            // console.log(i)

            var marker = {
              id: i,
              coords: {
                latitude:  36.273154,   //entry.coords.latitude,
                longitude: -86.817074   //entry.coords.longitude
              }
            };

            markers.push(marker) //an array with all the marker objs

            })

         $scope.tennisMarkers = markers;
         // console.log($scope.tennisMarkers)

      })


     }); //ending Google maps obj
  }); //ending controller
