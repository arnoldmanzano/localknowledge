(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('LocationController', ['LocationService', function(LocationService) {

    var self = this;

    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
      });
    };

    self.initMap = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: LocationService.coordinates, zoom: 16
      });
    };

    // self.getLocation();
    // self.initMap();

  }]);
}());
