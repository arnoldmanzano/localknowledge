describe('LocationController', function(){
  var ctrl, $window, $rootScope, $q, LocationService;

  beforeEach(function(){
    module('LocalKnowledgeApp');
    inject(function($controller, _$q_, _$window_, _$rootScope_, _LocationService_){
      ctrl = $controller("LocationController");
      $rootScope = _$rootScope_;
      $window = _$window_;
      LocationService = _LocationService_;
      $q = _$q_;
    });
  });

  it("retrieves information from the window obj with #navigator", function(){
    spyOn(LocationService, "displayLocation").andCallFake(function(){
      return $q.when('Place');
    });
    spyOn($window.navigator.geolocation,"getCurrentPosition").andCallFake(function() {
        var position = { coords: { latitude: 32, longitude: -96 } };
        arguments[0](position);
    });
    ctrl.getLocation();
    $rootScope.$apply();
    expect(ctrl.userLocationArea).toEqual('Place');
  });

});
