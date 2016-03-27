(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService', 'AutocompleteService', '$http', '$scope',
        function(LocationService, MarkersService, AutocompleteService, $http, $scope) {

    var self = this;
    var isInfoOpen = false;
    var clickedRequest = {};
    var requestUser = {};
    var autocompleteStarted;

    self.master = {};
    var autocompleteSuggestions = [];


    self.autoCompleteSearch = function(searchInput){
      if (searchInput.length < 3) {
        self.autocompleteStarted = false;
      } else {
        AutocompleteService.initAutocomplete(searchInput);
        self.autocompleteStarted = true;
        self.autocompleteSuggestions = AutocompleteService.makeSuggestions();
      }
      console.log(self.autocompleteSuggestions);
      //refactor to ternary
    };

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
        self.success = true;
      });
    };

    self.openClickedRequestInfo = function(requestData){
      self.isInfoOpen = true;
      self.clickedRequest = requestData.data.request;
      self.requestUser = requestData.data.user;
      console.log(requestData);
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
