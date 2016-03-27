(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService', '$http', '$scope', function(LocationService, MarkersService, $http, $scope) {

    var self = this;
    var isInfoOpen = false;
    var clickedRequest = {};
    var requestUser = {};

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
        self.success = true;
      });
    };

    self.openClickedRequestInfo = function(requestData){
      self.isInfoOpen = true;
      self.clickedRequest = requestData.data.request;
      self.requestUser = requestData.data.user;
      $scope.$digest();
      LocationService.centerMapOnAddress(self.clickedRequest.location);
    };

    self.closeClickedRequestInfo = function(){
      self.isInfoOpen = false;
    };

    self.toggleUserInfo = function(){
      self.isUserInfoOpen = !self.isUserInfoOpen;
    };

    $scope.$on("requestMarkerClicked", function(event, data){
      self.openClickedRequestInfo(data);
    });


  }]);

}());
