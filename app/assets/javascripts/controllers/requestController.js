(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService',
    '$http', '$scope', '$filter', function(LocationService, MarkersService, $http, $scope, $filter) {

    var self = this;
    self.isInfoOpen = false;
    self.isMoreOptions = false;
    self.clickedRequest = {};
    self.requestUser = {};
    self.isMoreTimeOptions = false;
    self.autocompleteStarted = false;
    self.tour_time_end = "00:00";

    self.master = {};
    var autocompleteSuggestions = [];

    self.update = function(request) {
      LocationService.centerMapOnAddress(request.location);
      LocationService.lookupCoords(request.location).then(function(coords) {
        request.lat = coords.lat;
        request.lng = coords.lng;
        self.master = angular.copy(request);
        self.postRequest(self.master);
        MarkersService.placeCurrentRequestMarker(request);
        // angular.element("#myModal").modal('hide');
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

    self.calculateTimeLimiter = function(requestStartTime, requestDuration){
      requestStartTime = requestStartTime === undefined ? new Date() : requestStartTime;
      requestDuration = requestDuration === undefined ? 2 : requestDuration;
      self.calculateTourEnd(requestStartTime, requestDuration);
      return 23 - requestStartTime.getHours();
    };

    self.calculateTourEnd = function(requestStartTime, requestDuration){
      var hoursStr = parseInt(requestStartTime.getHours()) + (parseInt(requestDuration) || 0);
      var minutesStr = requestStartTime.getMinutes();
      self.tour_time_end = hoursStr + ":" + minutesStr;
  };

    self.toggleMoreOptions = function(){
      self.isMoreOptions = !self.isMoreOptions;
    };

    self.toggleMoreTimeOptions = function(){
      self.isMoreTimeOptions = !self.isMoreTimeOptions;
    };

    self.outputUpdate = function(hours){
	     document.querySelector('#tour_duration').value = hours;
     };

  }]);

}());
