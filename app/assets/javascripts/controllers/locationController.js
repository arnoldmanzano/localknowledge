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
  }]);
}());
