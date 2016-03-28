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

    // var search = autoCompleteSearch;


    self.autoCompleteSearch = function(searchInput){
      if (searchInput.length < 2) {
        self.autocompleteStarted = false;
      } else {
        console.log(searchInput);
        AutocompleteService.initPredict(searchInput);
        // AutocompleteService.initAutocomplete();
        self.autocompleteStarted = true;

        self.autocompleteSuggestions = AutocompleteService.makeSuggestions();
        return self.autocompleteSuggestions;
      }
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
