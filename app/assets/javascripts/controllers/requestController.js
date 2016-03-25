(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService', '$http', '$scope', function(LocationService, MarkersService, $http, $scope) {

    var self = this;
    var isInfoOpen = false;
    var clickedRequest = {};

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
      $http.post('/requests', data).success(function(data, status) {
        console.log('success');
      });
    };

    self.openClickedRequestInfo = function(requestData){
      self.clickedRequest = requestData.data;
      self.isInfoOpen = true;
      debugger;
      $scope.$digest();
      LocationService.centerMapOnAddress(self.clickedRequest.location)
    };

    $scope.$on("requestMarkerClicked", function(event, data){
      self.openClickedRequestInfo(data);
    });


  }]);

}());
