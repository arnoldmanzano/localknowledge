describe("service: LocationService", function(){
  var location, $window;

  beforeEach(function(){
    module("LocalKnowledgeApp");
    inject(function(LocationService){
      location = LocationService;
    });
  });

  var position = {coords: {longitude: -0.0731683, latitude: 51.5173822}};

  describe('#getCurrentLocation', function() {
    var response = {
      results: [{formatted_address: 'Hello from the dark side!'}]
    };


    beforeEach(inject(function($httpBackend, _$window_) {
      httpBackend = $httpBackend;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 51.5173822 + "," + -0.0731683 + "&key=" + "";
      httpBackend
        .expectGET(url)
        .respond(response);
      $window = _$window_;
      spyOn($window.navigator.geolocation,"getCurrentPosition").and.callFake(function() {
        arguments[0](position);
      });
    }));

    it("gets Window geolocation and calls google api to return formatted address", function(){
      location.getCurrentLocation(function(response){
        httpBackend.flush();
        expect(response.results[0].formatted_address).toEqual('Hello from the dark side!');
      });
    });
  });

  describe('#lookupCoords', function() {
    var l = 'Paris';
    var response = {
      results: [{geometry: {location: position}}]
    };
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + l + "&key=" + "";
      httpBackend
        .expectGET(url)
        .respond(response);
    }));

    it("Lookups location and returns coords", function(){
      location.lookupCoords(l).then(function(response){
        expect(response).toEqual(position);
      });
      httpBackend.flush();
    });
  });
});
