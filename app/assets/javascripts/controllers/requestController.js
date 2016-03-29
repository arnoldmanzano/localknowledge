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
    var endTime;
    var timeLimiter;
    var isMoreTimeOptions = false;
    var autocompleteStarted;

    self.master = {};
    var autocompleteSuggestions = [];
    // var search = autoCompleteSearch;


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
      console.log(request);
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

    self.calculateTimeLimiter = function(requestDuration, requestStartTime){
      // var endHours = requestStartTime.getHours() + requestDuration;
      // var startMinutes = console.log(requestStartTime.getMinutes());
      // var stringTime = String(endHours) + ":" + String(startMinutes);
      self.timeLimiter = 24 - requestStartTime.getHours();
      // self.endTime = new Date(stringTime);
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
