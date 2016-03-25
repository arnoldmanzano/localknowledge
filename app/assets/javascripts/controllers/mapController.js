(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', 'MarkersService', function(LocationService, $http, MarkersService) {

    var self = this;

    self.getLocation = function() {
      console.log("get location started");
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
        LocationService.initMap();
        MarkersService.retrieveAllRequests();
      });
      console.log("get location finished");
    };

    self.getLocation();

  }]);
}());
