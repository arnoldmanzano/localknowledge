(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService',
    '$http', '$scope', '$filter', 'AutocompleteService', function(LocationService, MarkersService, $http, $scope, $filter, AutocompleteService) {

    var self = this;
    self.isInfoOpen = false;
    self.isMoreOptions = false;
    self.clickedRequest = {};
    self.requestUser = {};
    self.autocompleteChoice = '';
    self.master = {};
    self.autocompleteSuggestions = {};
    self.tour_time_end = "00:00";



    self.autoCompleteSearch = function(searchInput){
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
        console.log(request);
        MarkersService.placeCurrentRequestMarker(request);
        self.current_user_id = MarkersService.current_user_id;
        angular.element("#myModal").modal('hide');
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


    $scope.$on("requestMarkerClicked", function(event, data){
      self.openClickedRequestInfo(data);
    });

    self.calculateTimeLimiter = function(requestStartTime, requestDuration){
      var chosenStartTime = (requestStartTime === undefined || requestStartTime === null) ? new Date() : requestStartTime;
      var chosenDuration = (requestDuration === undefined || requestDuration === null) ? 2 : requestDuration;
      self.calculateTourEnd(chosenStartTime, chosenDuration);
      return 23 - chosenStartTime.getHours();
    };

    self.calculateTourEnd = function(requestStartTime, requestDuration){
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
