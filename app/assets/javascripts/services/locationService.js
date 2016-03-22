localKnowledgeApp.service('LocationService', ['$resource', function($resource) {
  var self = this;

  self.displayLocation = function(latPosition, longPosition){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latPosition + "," + longPosition + "&key=" + "";
    var geolocationResource = $resource(url);
    return geolocationResource.get().$promise.then(function(data){
      return data.results[6].formatted_address;
      });
  };
}]);
