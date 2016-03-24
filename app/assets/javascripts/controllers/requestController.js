(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', '$http', function(LocationService, $http) {

    var self = this;

    self.master = {};

    self.update = function(request) {
      LocationService.centerMapOnAddress(request.location);
      LocationService.lookupCoords(request.location).then(function(coords) {
        request.lat = coords.lat;
        request.lng = coords.lng;
        self.master = angular.copy(request);
        self.postRequests(self.master);
      });
    };

    self.postRequests = function(data) {
      console.log(data);
      $http.post('/requests', data).success(function(data, status) {
        console.log('success');
      });
    };

    self.retrieveAllRequests= function() {
      $http.get('/api_requests').then(function(response){
        var requests = response.data;
        console.log(requests);
        for (var i = 0; i < requests.length; i++) {
          var marker = new google.maps.Marker({
            position: {lat: parseFloat(requests.lat), lng: parseFloat(requests.lng)},
            map: LocationService.map,
            title: requests.description,
            animation: google.maps.Animation.DROP
          });
          console.log(marker);
        }
      });
    };
  }]);

}());
