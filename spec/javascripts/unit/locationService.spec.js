describe("service: LocationService", function(){
  var location;

  beforeEach(function(){
    module("LocalKnowledgeApp");
    inject(function(LocationService){
      location = LocationService;
    });
  });

  var response = {
    results: [ {}, {}, {}, {}, {}, {}, {
      formatted_address: 'Hello from the dark side!'
    }]
  };

  describe('#displayLocation', function() {
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 51.5173822 + "," + -0.0731683 + "&key=" + "";
      httpBackend
        .expectGET(url)
        .respond(response);
    }));

    it("Calls google api and return formatted address", function(){
      location.displayLocation(51.5173822,-0.0731683)
        .then(function(response) {
          expect(response).toEqual('Hello from the dark side!');
        });
      httpBackend.flush();
    });
  });
});
