(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('LocationController', ['LocationService', '$http', function(LocationService, $http) {

    var self = this;
    var map;

    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
        self.initMap();
      });
    };

    self.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: LocationService.coordinates, zoom: 10
      });
    };


    self.getRequests = function() {
      $http.get('/requests').then(function(response) {
        self.requests = response.data;
        var url = 'http://maps.google.com/maps/api/geocode/json?address=' + self.requests[0].location + '&sensor=false';

        $http.get(url).then(function(response) {
          // console.log(response);
          // console.log(response.data.results[0].geometry.location);
          // console.log(LocationService.coordinates);
          var marker = new google.maps.Marker({
            position: response.data.results[0].geometry.location,
            map: map,
            title: 'Hello'
          });
        });
      });
    };

    self.getLocation();

  }]);
}());
