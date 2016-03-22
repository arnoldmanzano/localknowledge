localKnowledgeApp.controller('LocationController', ['$window', '$resource', function($window, $resource) {

var self = this;
self.x = "BLA";
var window = $window;
var latPosition = "";
var longPosition = "";
var userLocationArea = "";

  self.getLocation = function (){
    if ($window.navigator.geolocation) {
      $window.navigator.geolocation.getCurrentPosition(self.storePosition);
    } else {
      prompt("Geolocation is not supported by your browser. Enter your postcode");
    }
  };



  self.storePosition = function(position) {
    self.latPosition = position.coords.latitude;
    self.longPosition = position.coords.longitude;
    console.log(self.latPosition);
    self.displayLocation();
  };


  self.displayLocation = function(){
    var geolocationResource = $resource("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + self.latPosition + "," + self.longPosition + "&key=" + "");
    geolocationResource.get().$promise.then(function(data){
    self.userLocationArea = data.results[6].formatted_address;
    });
  };

self.getLocation();


}]);
