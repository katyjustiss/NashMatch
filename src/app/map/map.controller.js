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
      $scope.options = {
        scrollwheel: false,
        styles: styleArray
      };

      $scope.selected = {show: false};

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
              latitude: entry.latitude,
              longitude: entry.longitude,
              name: entry.park_name,
              lights: entry.lights,
              show: false
            }; //used self in the directive because have lat and long directly in obj.

            //Adding windows on click
            marker.onClick = function() {
              $scope.selected.show = false;
              $scope.selected = marker; //working
              $scope.selected.show = !$scope.selected.show;
              $scope.$apply();
            };

            marker.closeClick = function() {
              $scope.selected.show = false;
              $scope.$apply();
            };

            markers.push(marker) //an array with all the marker objs

            })

         $scope.tennisMarkers = markers;

       })

        var styleArray = [
          {
            stylers: [
              { hue: "#00ff6f" },
              { saturation: -50 }
            ]
          }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              { lightness: 100 },
              { visibility: "simplified" }
            ]
          }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              { hue: "#ff6600" },
              { saturation: +80}
            ]
          }, {
            featureType: "transit",
            elementType: "labels",
            stylers: [
              { hue: "#ff0066" },
              { saturation: +80}
            ]
          }
        ]

     }); //ending Google maps obj
  }); //ending controller
