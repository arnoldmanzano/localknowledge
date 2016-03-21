localKnowledgeApp.controller('LocationController', ['$window', function($window) {

var self = this;
self.x = "BLA";
var window = $window;
var latPosition = "";
// method that extracts the location from the window element

  self.getLocation = function (){
    console.log("hello");
    window.alert("YO");
    if ($window.navigator.geolocation) {

      $window.navigator.geolocation.getCurrentPosition(self.showPosition);
    } else {
      prompt("Geolocation is not supported by your browser. Enter your postcode");
    }
  };

  self.showPosition = function(position) {
      console.log(position.coords.latitude);
    return self.latPosition = position.coords.latitude;
  };
// method that takes the longitude and latitude and pops them into the google location API

self.getLocation();

}]);
