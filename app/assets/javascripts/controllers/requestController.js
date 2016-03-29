(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService',
    '$http', '$scope', '$filter', function(LocationService, MarkersService, $http, $scope, $filter) {

    var self = this;
    var isInfoOpen = false;
    var isMoreOptions = false;
    var clickedRequest = {};
    var requestUser = {};
    var isMoreTimeOptions = false;
    var autocompleteStarted;
    var tour_time_end = "00:00";
    // var presetStartTime = Date.now();

    self.master = {};
    var autocompleteSuggestions = [];


    self.autoCompleteSearch = function(searchInput){
        if (searchInput.length < 2) {
        self.autocompleteStarted = false;
      } else {
        AutocompleteService.initPredict(searchInput);
        self.autocompleteStarted = true;
        self.autocompleteSuggestions = AutocompleteService.makeSuggestions();
        return self.autocompleteSuggestions;
      }
    };

    self.update = function(request) {

      console.log(request.time_of_day);
        LocationService.centerMapOnAddress(request.location);
        LocationService.lookupCoords(request.location).then(function(coords) {
        request.lat = coords.lat;
        request.lng = coords.lng;
        self.master = angular.copy(request);
        self.postRequest(self.master);
        MarkersService.placeCurrentRequestMarker(request);
        angular.element("#myModal").modal('hide');
      });
  };

    self.postRequest = function(data) {
      $http.post('/requests', data).success(function(data, status) {
        self.success = true;
      });

    };

    self.openClickedRequestInfo = function(requestData){
      console.log(requestData);
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
      var defaultStartTime = (requestStartTime === undefined) ? new Date() : requestStartTime;
      var defaultRequestDuration = (requestDuration === undefined) ? 2 :requestDuration;
      self.calculateTourEnd(defaultStartTime, defaultRequestDuration);
      return 23 - defaultStartTime.getHours();
    };

    self.calculateTourEnd = function(requestStartTime, requestDuration){
      var hoursStr = requestStartTime.getHours() + (parseInt(requestDuration) || 0);
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
