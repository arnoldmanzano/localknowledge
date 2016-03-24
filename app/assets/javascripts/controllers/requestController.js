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
      self.postRequests(self.master);
    };

    self.postRequests = function(data) {
      $http.post('/requests', data).success(function(data, status) {
        console.log('success');
      });
    };


  }]);

}());
