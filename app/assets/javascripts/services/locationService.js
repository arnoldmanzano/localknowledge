(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('LocationService', ['$resource', '$window', function($resource, $window) {
    var self = this;

    self.getCurrentLocation = function(callback){
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=" + "";
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
