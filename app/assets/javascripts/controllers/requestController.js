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
        debugger;
        self.postRequest(self.master);
        MarkersService.placeCurrentRequestMarker(request);
        angular.element("#myModal").modal('hide');
      });
    // } else {
    //   self.isMoreTimeOptions = true;
    //    console.log("start of un-filled in bits of time in update");
    //    request.tour_time_end = Date.parse(self.tour_time_end);
    //    self.update(request);
    //    console.log("end of un-filled in bits of time in update");
    // }
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
      requestStartTime = requestStartTime || Date.now();
      requestDuration = requestDuration || 2;
      self.calculateTourEnd(requestStartTime, requestDuration);
      return 23 - requestStartTime.getHours();
    };

    self.calculateTourEnd = function(requestStartTime, requestDuration){
      console.log("inside calculateTourEnd");
      var hoursStr = parseInt(requestStartTime.getHours()) + (parseInt(requestDuration) || 0);
      console.log(hoursStr);

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
