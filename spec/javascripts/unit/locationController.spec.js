describe('MapController', function(){
  var ctrl, $window, $rootScope, $q, LocationService;

  beforeEach(function(){
    module('LocalKnowledgeApp');
    inject(function($controller, _LocationService_){
      ctrl = $controller("MapController");
      LocationService = _LocationService_;
      google = { maps: { Map: function(){} }};
    });
  });

  it("retrieves information from the window obj with #navigator", function(){
    spyOn(LocationService, "getCurrentLocation").and.callFake(function(callback){
      callback('Place');
    });
    spyOn(ctrl, "initMap");

    ctrl.getLocation();
    expect(ctrl.initMap).toHaveBeenCalled();
    expect(ctrl.userLocationArea).toEqual('Place');
  });

});
