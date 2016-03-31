(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', 'MarkersService',
    '$http', '$scope', '$filter', function(LocationService, MarkersService, $http, $scope, $filter) {

    var self = this;
    self.clickedRequest = {};
    self.requestUser = {};


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


  }]);

}());
