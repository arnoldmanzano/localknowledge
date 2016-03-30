(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MarkersService', ['LocationService', '$http', '$rootScope', function(LocationService, $http, $rootScope) {

    var self = this;
    var map;
    var users;

    self.placeCurrentRequestMarker = function(request){
      map = LocationService.map;
      var current_user;
      $http.get('/api/c_user').then(function(response){
        current_user = response.data;
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
          map: map,
          animation: google.maps.Animation.DROP
        });
        self.addRequestMarkerInfo(map, marker, request, current_user);
      });
    };


    self.retrieveAllRequests = function (callback) {
      $http.get('/api/users').then(function(response){
        self.dropAllRequestMarkers(response);
      });
    };

    self.dropAllRequestMarkers = function(response){
      map = LocationService.map;
      users = response.data;
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var requests = user.requests;
        for (var j = 0; j < requests.length; j++) {
          var request = requests[j];
          var marker = new google.maps.Marker({
            position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
            map: map,
            title: request.description,
            animation: google.maps.Animation.DROP
          });
          self.addRequestMarkerInfo(map, marker, request, user);
        }
      }
    };

    self.addRequestMarkerInfo = function(map, marker, request, user){
      marker.addListener('click', function() {
        $rootScope.$broadcast("requestMarkerClicked", {
          data: {request: request, user: user}
          });
        });
      };

  }]);
}());
