(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', 'RequestService', function(LocationService, $http, RequestService) {

    var self = this;

    self.getLocation = function() {
      console.log("get location started");
      LocationService.getCurrentLocation(function(resource) {
        self.userLocationArea = resource;
        LocationService.initMap();
        RequestService.retrieveAllRequests();
      });
      console.log("get location finished");
    };

    self.getLocation();

  }]);
}());
