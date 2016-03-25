(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MarkersService', ['LocationService', '$http', '$rootScope', '$q', function(LocationService, $http, $rootScope, $q) {

    var self = this;
    var map;
    // var isRequestInfoOpen = false;
    // var clickedRequest;

    self.placeCurrentRequestMarker = function(request){
      map = LocationService.map;
      var marker = new google.maps.Marker({
        position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
        map: map,
        animation: google.maps.Animation.DROP
      });
      self.addRequestMarkerInfo(map, marker, request);
    };


    self.retrieveAllRequests = function (callback) {
      map = LocationService.map;
      $http.get('/api_requests').then(function(response){
        self.dropAllRequestMarkers(response);
      });
    };

    self.dropAllRequestMarkers = function(response){
      var requests = response.data;
      for (var i = 0; i < requests.length; i++) {
        var request = requests[i];
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
          map: map,
          title: request.description,
          animation: google.maps.Animation.DROP
        });
        self.addRequestMarkerInfo(map, marker, request);
      }
    };

    self.addRequestMarkerInfo = function(map, marker, request){
      var infowindow = new google.maps.InfoWindow({
            content: request.description + '</br>' +
            '<a href="https://localhost:3000/1/replies/new">' +
            'Hardcoded example</a>'
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            $rootScope.$broadcast("requestMarkerClicked", {
              data: request
            });
          });
        };


  }]);
}());
