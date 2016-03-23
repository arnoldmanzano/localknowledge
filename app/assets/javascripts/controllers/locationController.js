(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('LocationController', ['LocationService', '$window', '$resource', function(LocationService, $window, $resource) {

  var self = this;

    self.getLocation = function (){
        $window.navigator.geolocation.getCurrentPosition(function(position){
          LocationService.displayLocation(position).then(function(data){
            self.userLocationArea = data;
          });
        }, function(error) {
          self.userLocationArea = prompt("Geolocation is not supported by your browser. Enter your postcode");
        });
    };

    // self.getLocation();

  }]);
}());
