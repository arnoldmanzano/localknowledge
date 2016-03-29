(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MarkersService', ['LocationService', 'UserSessionService', '$http', '$rootScope', '$q', function(LocationService, UserSessionService, $http, $rootScope, $q) {

    var self = this;
    var map;
    var users;

    self.placeCurrentRequestMarker = function(request){
      map = LocationService.map;
      var currentUserId = UserSessionService.currentUser;
      console.log(currentUserId);
      $http.get('/api/c_user').then(function(response){
        current_user = response.data;
        self.current_user_id = current_user.id;
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(request.lat), lng: parseFloat(request.lng)},
          map: map,
          animation: google.maps.Animation.DROP
        });
        self.addRequestMarkerInfo(map, marker, request, currentUserId);
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
      console.log(users);
      // console.log("Hello from inside drop all request markers");
      // console.log(users);
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
