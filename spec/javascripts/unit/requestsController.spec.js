describe("controller: RequestController", function(){
  var Rctrl, LocationService, MarkersService, dummy_request, google, constructorSpy, geocoder;

  describe("update", function(){


  beforeEach(function(){
    module('LocalKnowledgeApp');
    inject(function($controller, _LocationService_, _MarkersService_){
      Rctrl = $controller("RequestController");
      LocationService = _LocationService_;
      spyOn(LocationService, "centerMapOnAddress");
      spyOn(LocationService, "lookupCoords").and.callThrough();



      MarkersService = _MarkersService_;
      spyOn(MarkersService, "placeCurrentRequestMarker");
      // spyOn(MarkersService, "postRequest");

      google = { maps: { Map: function(){}, Geocoder: function(){} }  };
      constructorSpy = spyOn(google.maps, 'Geocoder');
      geocoder = jasmine.createSpyObj('constructorSpy', ['geocode']);
      geocoder.geocode.and.callFake(function() {});
      dummy_request = jasmine.createSpyObj('dummy_request', ['location', 'budget', 'request_date', 'description']);
      Rctrl.update(dummy_request);
    });
  });

    it("centers the map to the address location the tourist entered in the form", function(){
      expect(LocationService.centerMapOnAddress()).toHaveBeenCalled();
      //.toHaveBeenCalledWith(dummy_request.location);
    });

    it("looks up the coordinates using the user-inputted address", function(){
      expect(LocationService.centerMapOnAddress()).toHaveBeenCalledWith(dummy_request.location);
    });

    it("calls the drop current pin function in the MarkersService", function(){
      expect(MarkersService.placeCurrentRequestMarker()).toHaveBeenCalledWith(dummy_request);
    });

    it("calls a postRequest function to send a http request to rails backend", function(){
      expect(Rctrl.postRequest()).toHaveBeenCalledWith(dummy_request);
    });

  });

});
