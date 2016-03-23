(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('LocationService', ['$resource', '$window', function($resource, $window) {
    var self = this;

    self.getCurrentLocation = function(callback){
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        self.coordinates = {lat: position.coords.latitude, lng: position.coords.longitude};
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + self.coordinates.lat + "," + self.coordinates.lng + "&key=" + "";
        callback($resource(url).get());
      });
    };

    // self.getCurrentLocation = function(){
    //   var latitude = 51;
    //   var longitude = 0;
    //   var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + "";
    //   return $resource(url).get();
    // };
  }]);
}());
