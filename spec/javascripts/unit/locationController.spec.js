describe("locationController", function(){
  var ctrl;

  beforeEach(function(){
    module("localKnowledgeApp");
    inject(function($controller){
      ctrl = $controller("locationController");
    });
  });


  it("Pulls the users latitude from the window object", function(){
    ctrl.getLocation(function(){
      expect(ctrl.showPosition()).toEqual(10);
    });
  });
});
