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
});
