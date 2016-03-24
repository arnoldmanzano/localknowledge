(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', '$http', function(LocationService, $http) {

    var self = this;

    self.master = {};

    self.update = function(request) {
      LocationService.centerMapOnAddress(request.location);
      LocationService.lookupCoords(request.location).then(function(coords) {
        request.coords = coords;
      });
      self.master = angular.copy(request);
      console.log(self.master);
    };



  }]);

}());
