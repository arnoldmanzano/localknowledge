describe("controller: RequestController", function(){
  var Rctrl, LocationService, MarkersService;
  var dummy_request, google, constructorSpy, geocoder;
  var MockLocationService, scope;

  beforeEach(function(){
    module('LocalKnowledgeApp');
    // inject(function($controller, _MarkersService_, _$httpBackend_, $rootScope, $q){
    //   var scope = $rootScope.$new();
    //   MockLocationService = jasmine.createSpyObj('LocationService', ['centerMapOnAddress', 'lookupCoords']);
    //   Rctrl = $controller("RequestController", {$scope: scope, LocationService: MockLocationService});
    //   MockLocationService.centerMapOnAddress.and.returnValue();
    //   MockLocationService.lookupCoords.and.returnValue($q.when());
    //   dummy_request = jasmine.createSpyObj('dummy_request', ['location', 'budget', 'request_date', 'description']);
    //   MarkersService = _MarkersService_;
    //   spyOn(MarkersService, "placeCurrentRequestMarker");
    inject(function($controller, _LocationService_, _MarkersService_, _$httpBackend_, $rootScope, $q){
      scope = $rootScope.$new();
      Rctrl = $controller("RequestController", {$scope: scope});
      LocationService = _LocationService_;
      MarkersService = _MarkersService_;
      dummy_request = jasmine.createSpyObj('dummy_request', ['location', 'budget', 'request_date', 'description']);
      spyOn(MarkersService, "placeCurrentRequestMarker").and.callFake(function(){});
      spyOn(LocationService, "centerMapOnAddress").and.callFake(function(){});
      // spyOn(LocationService, "lookupCoords").and.callFake(function() {
      //   return $q.when();
      // });
      spyOn(Rctrl, "postRequest").and.callFake(function(){});

      spyOn(LocationService, "lookupCoords").and.callFake(function() {
        return $q.when(function() {
          MarkersService.placeCurrentRequestMarker(dummy_request);
          Rctrl.postRequest(dummy_request);
        });
      });

      // spyOn(MarkersService, "placeCurrentRequestMarker");
      // google = { maps: { Map: function(){}, Geocoder: function(){} }  };
      // constructorSpy = spyOn(google.maps, 'Geocoder');
      // geocoder = jasmine.createSpyObj('constructorSpy', ['geocode']);
      // geocoder.geocode.and.callFake(function() {});
      // Rctrl.update(dummy_request);
    });
  });

    it("centers the map to the address location the tourist entered in the form", function(){
      Rctrl.update(dummy_request);
      expect(LocationService.centerMapOnAddress).toHaveBeenCalledWith(dummy_request.location);
      // expect(MockLocationService.centerMapOnAddress).toHaveBeenCalledWith(dummy_request.location);
    });

    it("looks up the coordinates using the user-inputted address", function(){
      Rctrl.update(dummy_request);
      expect(LocationService.lookupCoords).toHaveBeenCalledWith(dummy_request.location);
    });

    it("calls the drop current pin function in the MarkersService", function(){
      Rctrl.update(dummy_request);
      scope.$apply();
      expect(MarkersService.placeCurrentRequestMarker).toHaveBeenCalledWith(dummy_request);
    });

    it("calls a postRequest function to send a http request to rails backend", function(){
      Rctrl.update(dummy_request);
      // expect(Rctrl.postRequest).toHaveBeenCalledWith(dummy_request);
      scope.$apply();
      expect(Rctrl.postRequest).toHaveBeenCalled();
    });

});
