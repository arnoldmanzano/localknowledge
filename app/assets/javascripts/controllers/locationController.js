localKnowledgeApp.controller('LocationController', ['$window', function($window) {

var self = this;
var x = "BLA";
var window = $window;
// method that extracts the location from the window element

  self.getLocation = function (){
    debugger;
    console.log("hello");
    window.alert("YO");
    if ($window.navigator.geolocation) {

      $window.navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      prompt("Geolocation is not supported by your browser. Enter your postcode");
    }
  };

  self.showPosition = function(position) {
      return position.coords.latitude;
  };
// method that takes the longitude and latitude and pops them into the google location API

self.getLocation();
console.log(x);

  self.alert = function() {
    debugger;
    return alert('hello world');
  };

}]);
