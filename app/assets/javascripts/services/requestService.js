(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('RequestService', ['LocationService', '$http', function(LocationService, $http) {

var self = this;
var map;
// var markers = [];

self.retrieveAllRequests = function (callback) {
  map = LocationService.map;
  $http.get('/api_requests').then(function(response){
    var requests = response.data;
    for (var i = 0; i < requests.length; i++) {
      var request = requests[i];
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
        map: map,
        title: request.description,
        animation: google.maps.Animation.DROP
      });
    //   self.addRequestInfo();
    //
    //   marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });
  }
  console.log("Retrieve all requests finished");
});
};

// self.addRequestInfo = function(){
//   //this should be in a service that you can use to convert user requests from json from rails into a display form?
//   // this can also be a 'for each' function?
//   infowindow = new google.maps.InfoWindow({
//         content: "this will be a html partial with the details of the request embedded into it?"
//       });
// };
}]);

}());
