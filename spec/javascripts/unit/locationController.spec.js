describe("LocationController", function(){
  var ctrl;
  var MockLocationService;
  var mockWindow;
  var $window;


  beforeEach(function(){
    // mockWindow = $window;
    MockLocationService = jasmine.createSpyObj('LocationService', ['displayLocation']);
    // mockWindow.navigator.geolocation = {
    //   getCurrentPosition: function() {
    //     var position = {coords: {longitude: -0.0731683, latitude: 51.5173822}};
    //     return position
    //   }
    // }
    //
    // spyOn(navigator, 'geolocation').and.callThrough();
    // mockWindow = jasmine.createSpy(window.navigator.geolocation);
    // spyOn(mockWindow, 'getCurrentPosition').and.callFake(function(){
    //   var position = {coords: {longitude: -0.0731683, latitude: 51.5173822}};
    //   arguments[0](position);
    // });

    module("LocalKnowledgeApp", {LocationService: MockLocationService});
    inject(function($controller){
      ctrl = $controller("LocationController");
    });


  });

  //
  // beforeEach(inject([$controller, function ($controller) {
  //     $window = jasmine.createSpyObj('$window', ['navigator']);
  //
  // }]));

  // it('should confirm that the user is trying to clear the custom phone number', function() {
  //   $window.confirm();
  //     expect($window.confirm).toHaveBeenCalled();
  // });

  it("retrieves information from the window obj with #navigator", function(){
    spyOn(mockWindow, 'navigator').and.callThrough();

    expect(mockWindow.navigator).toHaveBeenCalled();
    ctrl.getLocation();
  });


  it("Pulls the users latitude from the window object", function(){
    ctrl.getLocation(function(){
      expect(ctrl.userLocationArea).toEqual(10);
    });
  });

});
