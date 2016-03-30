(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('LocationService', ['$resource', '$window', 'MapsStylesService', 'AutocompleteService', function($resource, $window, MapsStylesService, AutocompleteService) {

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
        center: self.coordinates,
        zoom: 15,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });
      geocoder = new google.maps.Geocoder();
      self.map = map;
      MapsStylesService.createStyledMap();
      map.mapTypes.set('map_style', MapsStylesService.madColorsMapStyle);
      map.setMapTypeId('map_style');
      AutocompleteService.initPredict();
    };

    self.lookupCoords = function(location) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + "";
        return $resource(url).get().$promise.then(function(response){
           return response.results[0].geometry.location;
        });
    };

    self.centerMapOnAddress = function(location) {
       geocoder.geocode({'address': location}, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       });
    };

    // self.centerMapOnCoords = function(lat, lng) {
    //   map.setCenter({lat: lat, lng: lng});
    // };

  }]);
}());
