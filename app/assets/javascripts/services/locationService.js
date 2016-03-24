(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('LocationService', ['$resource', '$window', function($resource, $window) {
    var self = this;
    var geolocation = $window.navigator.geolocation;

    self.getCurrentLocation = function(callback){
      geolocation.getCurrentPosition(function(position) {
        self.coordinates = {lat: position.coords.latitude, lng: position.coords.longitude};
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + self.coordinates.lat + "," + self.coordinates.lng + "&key=" + "";
        callback($resource(url).get());
      });
    };

    // self.getCurrentLocation = function(){
    //   var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 51 + "," + 0 + "&key=" + "";
    //   return $resource(url).get();
    // };
  }]);
}());
