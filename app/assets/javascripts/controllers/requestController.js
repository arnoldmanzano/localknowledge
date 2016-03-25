(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService', '$http', function(LocationService, MarkersService, $http) {

    var self = this;

    self.master = {};

    self.update = function(request) {
      LocationService.centerMapOnAddress(request.location);
      LocationService.lookupCoords(request.location).then(function(coords) {
        request.lat = coords.lat;
        request.lng = coords.lng;
        self.master = angular.copy(request);
        self.postRequest(self.master);
        MarkersService.placeCurrentRequestMarker(request);
      });
    };

    self.postRequest = function(data) {
      console.log(data);
      $http.post('/requests', data).success(function(data, status) {
        console.log('success');
      });
    };

  }]);

}());
