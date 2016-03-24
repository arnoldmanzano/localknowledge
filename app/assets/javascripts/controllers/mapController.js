(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', function(LocationService, $http) {

    var self = this;

    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
        LocationService.initMap();
      });
    };

    // TO BE DELETED
    // self.getRequests = function() {
    //   $http.get('/requests').then(function(response) {
    //     self.requests = response.data;
    //     var url = 'http://maps.google.com/maps/api/geocode/json?address=' + self.requests[0].location + '&sensor=false';
    //
    //     $http.get(url).then(function(response) {
    //       var marker = new google.maps.Marker({
    //         position: response.data.results[0].geometry.location,
    //         map: map,
    //         title: 'Hello'
    //       });
    //     });
    //   });
    // };

    self.getLocation();

  }]);
}());
