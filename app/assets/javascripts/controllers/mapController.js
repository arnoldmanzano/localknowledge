(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', 'MarkersService', function(LocationService, $http, MarkersService) {

    var self = this;

    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
        LocationService.initMap();
        MarkersService.retrieveAllRequests();
      });
    };

    self.getLocation();

  }]);
}());
