describe("locationController", function(){
  var ctrl;

  beforeEach(function(){
    module("LocalKnowledgeApp");
    inject(function($controller){
      ctrl = $controller("locationController");
    });
  });


  xit("Pulls the users latitude from the window object", function(){
    ctrl.getLocation(function(){
      expect(ctrl.userLocationArea()).toEqual(10);
    });
  });
});
