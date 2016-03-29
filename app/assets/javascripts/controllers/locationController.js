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

  }]);
}());
