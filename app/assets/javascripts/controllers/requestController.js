(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', '$http', function(LocationService, $http) {

    var self = this;

    self.master = {};

    self.update = function(request) {
      // self.master = angular.copy(request);
      // console.log(request);
      LocationService.geocodeAddress(request.location);
    };

  }]);

}());
