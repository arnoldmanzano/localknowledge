(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('MapController', ['LocationService', '$http', 'MarkersService', 'UserSessionService', function(LocationService, $http, MarkersService, UserSessionService) {

    var self = this;

    self.getLocation = function() {
      LocationService.getCurrentLocation(function(resource) {
        LocationService.initMap();
        self.userLocationArea = resource;
        MarkersService.retrieveAllRequests();
        UserSessionService.getCurrentUser().then(function(response) {
          self.current_user = response;
        });
      });
    };

    self.getLocation();

  }]);
}());
