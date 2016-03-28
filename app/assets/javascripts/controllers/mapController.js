(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', 'MarkersService', function(LocationService, $http, MarkersService) {

    var self = this;


    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        LocationService.initMap();
        self.userLocationArea = resource;
        MarkersService.retrieveAllRequests();
      });
    };

    self.getLocation();

  }]);
}());
