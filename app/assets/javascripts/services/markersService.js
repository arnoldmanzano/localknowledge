(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MarkersService', ['LocationService', '$http', function(LocationService, $http) {

var self = this;
var map;

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
  // var template = require('../../views/replies/new.html.erb');
  var infowindow = new google.maps.InfoWindow({
        content: request.description
        // request.description
        // string of .html
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    };


  }]);
}());
