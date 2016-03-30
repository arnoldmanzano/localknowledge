(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService',
    '$http', '$scope', '$filter', 'AutocompleteService', function(LocationService, MarkersService, $http, $scope, $filter, AutocompleteService) {

    var self = this;
    var isInfoOpen = false;
    self.isMoreOptions = false;
    var clickedRequest;
    var requestUser;
    self.autocompleteChoice = '';
    self.master = {};
    self.autocompleteSuggestions = {};



    self.autoCompleteSearch = function(searchInput){
      console.log(searchInput);
      AutocompleteService.updateSuggestions(searchInput);
      self.autocompleteSuggestions = AutocompleteService.makeSuggestions();
    };

    self.moveHere = function(locationSearch) {
      LocationService.centerMapOnAddress(locationSearch);
      self.autocompleteChoice = locationSearch;
    };

    self.update = function(request) {
        LocationService.centerMapOnAddress(request.location);
        LocationService.lookupCoords(request.location).then(function(coords) {
        request.lat = coords.lat;
        request.lng = coords.lng;
        self.master = angular.copy(request);
        self.postRequest(self.master);
        MarkersService.placeCurrentRequestMarker(request);
        // self.current_user_id = MarkersService.current_user_id;
        // angular.element("#myModal").modal('hide');
      });
  };

    self.postRequest = function(data) {
      $http.post('/requests', data).success(function(data, status) {
        self.success = true;
      });

    };

    self.openClickedRequestInfo = function(requestData){
      isInfoOpen = true;
      clickedRequest = requestData.data.request;
      requestUser = requestData.data.user;
      $scope.$digest();
      LocationService.centerMapOnAddress(clickedRequest.location);
    };

    self.closeClickedRequestInfo = function(){
      self.isInfoOpen = false;
    };


    $scope.$on("requestMarkerClicked", function(event, data){
      console.log(data);
      self.openClickedRequestInfo(data);
    });

    self.calculateTimeLimiter = function(requestStartTime, requestDuration){
      requestStartTime = requestStartTime === undefined ? new Date() : requestStartTime;
      requestDuration = requestDuration === undefined ? 2 : requestDuration;
      self.calculateTourEnd(requestStartTime, requestDuration);
      return 23 - requestStartTime.getHours();
    };

    self.calculateTourEnd = function(requestStartTime, requestDuration){
      console.log(requestStartTime);
      var hoursStr = parseInt(requestStartTime.getHours()) + (parseInt(requestDuration) || 0);
      var minutesStr = requestStartTime.getMinutes();
      self.tour_time_end = hoursStr + ":" + minutesStr;
  };

    self.toggleMoreOptions = function(){
      self.isMoreOptions = !self.isMoreOptions;
    };


    self.outputUpdate = function(hours){
	     document.querySelector('#tour_duration').value = hours;
     };

  }]);

}());
