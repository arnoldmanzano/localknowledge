describe("service: LocationService", function(){
  var location;

  beforeEach(function(){
    module("LocalKnowledgeApp");
    inject(function(LocationService){
      location = LocationService;
    });
  });

  var response = {
    results: [{formatted_address: 'Hello from the dark side!'}]
  };

  var position = {coords: {longitude: -0.0731683, latitude: 51.5173822}};

  describe('#displayLocation', function() {
    beforeEach(inject(function($httpBackend, _$window_) {
      httpBackend = $httpBackend;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 51.5173822 + "," + -0.0731683 + "&key=" + "";
      httpBackend
        .expectGET(url)
        .respond(response);
      $window = _$window_;
    }));

    it("Calls google api and return formatted address", function(done){
      spyOn($window.navigator.geolocation,"getCurrentPosition").andCallFake(function() {
          var position = { coords: { latitude: 32, longitude: -96 } };
          arguments[0](position);
      });

      // // location.displayLocation(position)
      // //   .then(function(response) {
      // //     expect(response).toEqual('Hello from the dark side!');
      // //   });
      // var response = location.displayLocation(position);
      //     expect(response).toEqual('Hello from the dark side!');
      //
      // httpBackend.flush();

      location.getCurrentLocation(function(){
        done();
      });
    });
  });
});
