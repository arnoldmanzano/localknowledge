localKnowledgeApp.controller('LocationController', ['$window', '$resource', 'LocationService', function($window, $resource, LocationService) {

var self = this;
var window = $window;
var userLocationArea = "";

  self.getLocation = function (){
      window.navigator.geolocation.getCurrentPosition(function(position){
        LocationService.displayLocation(position).then(function(data){
          self.userLocationArea = data;
        });
      }, function(error) {
        self.userLocationArea = prompt("Geolocation is not supported by your browser. Enter your postcode");
      });
  };

  self.getLocation();

}]);
