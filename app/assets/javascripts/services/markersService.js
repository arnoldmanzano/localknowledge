(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('MarkersService', ['LocationService', '$http', '$rootScope', '$q', function(LocationService, $http, $rootScope, $q) {

    var self = this;
    var map;


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

      var contentString = '<div id="iw-container">' +
                    '<div class="iw-title">'+ user.f_name +' '+ user.l_name +'</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Description</div>' +
                      '<p><b>Location: </b>'+ request.location +'</p>' +
                      '<img class="img-circle" src='+ user.avatar_url +' alt="Profile picture"' +
                      '<p>'+ request.description +'</p>' +
                      '<div class="iw-subTitle">Reply to this request</div>' +
                      '<a href="#">Reply</a>'+
                      '<p>e-mail:'+ user.email+'</p>'+
                    '</div>' +
                  '</div>';
      var infowindow = new google.maps.InfoWindow({
            content: contentString
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
