describe("service: LocationService", function(){
  var location, $window;

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

  describe('#getCurrentLocation', function() {
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
});

// // location.getCurrentLocation(position)
// //   .then(function(response) {
// //     expect(response).toEqual('Hello from the dark side!');
// //   });
// var response = location.getCurrentLocation(position);
//     expect(response).toEqual('Hello from the dark side!');
//
// httpBackend.flush();
// var position = { coords: { latitude: 32, longitude: -96 } };
// var position = position;
