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
      $http.get('/api/users').then(function(response){
        self.dropAllRequestMarkers(response);
      });
    };

    self.dropAllRequestMarkers = function(response){
      var users = response.data;
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

      var contentString = '<div id="content">'+
     '<div id="siteNotice">'+
     '</div>'+
     '<h1 id="firstHeading" class="firstHeading">'+ user.email +'</h1>'+
     '<div id="bodyContent">'+
     '<p>' + request.description + '</p>'+
     '<p><a href="">'+ 'Reply'+ '</a> '+ '</p>'+
     '</div>'+
     '</div>';


      var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        };

  }]);
}());
