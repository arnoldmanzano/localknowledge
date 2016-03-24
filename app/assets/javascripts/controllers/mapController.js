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

    self.getLocation();

  }]);
}());
