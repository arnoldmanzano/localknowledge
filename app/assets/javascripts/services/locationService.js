(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('LocationService', ['$resource', '$window', function($resource, $window) {

    var self = this;
    var geolocation = $window.navigator.geolocation;
    var map;
    var geocoder;

    self.getCurrentLocation = function(callback){
      geolocation.getCurrentPosition(function(position) {
        self.coordinates = {lat: position.coords.latitude, lng: position.coords.longitude};
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + self.coordinates.lat + "," + self.coordinates.lng + "&key=" + "";
        callback($resource(url).get());
      });
    };

    self.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: self.coordinates, zoom: 10
      });
      geocoder = new google.maps.Geocoder();
    };

    self.geocodeAddress = function(location) {
      //  var address = document.getElementById('address').value;
       geocoder.geocode({'address': location}, function(results, status) {
         console.log(results[0].geometry.location.lat);
         if (status === google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
          //  var marker = new google.maps.Marker({
          //    map: resultsMap,
          //    position: results[0].geometry.location
          //  });
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       });
     };

  }]);
}());
