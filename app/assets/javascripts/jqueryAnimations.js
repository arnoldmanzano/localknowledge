$( document ).ready(function () {

  $(function(){
   $('.datepicker').datepicker({
      format: 'mm-dd-yyyy'
    });
  });


  $(".btn-for-request").hover(function(){
  	$(this).stop().animate({
  		top: "5",
  		left: "5"
  	}, 100 );
  },
  function(){
  	$(this).stop().animate({
  		top: 0,
  		left: 0
  	}, 100 );
  });


  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");

      var value = $(".map")[0].style.width !== "100vw" ? '100vw' : '87vw';

      $("#map").animate({
      	      width: value
          }, {step:function(){
              google.maps.event.trigger(map,'resize');
          },
      });
  });
});
