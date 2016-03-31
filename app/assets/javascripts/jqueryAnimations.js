$( document ).ready(function () {
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

  setTimeout(function(){
    $('.alert').fadeOut();
  }, 3000);

  function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#signUpAvatar').attr('src', e.target.result);
    };
  reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});

function readURLReplypics(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#replyPicsOut1').attr('src', e.target.result);
      $('#replyPicsOut1').attr('class', 'img-responsive');
    };
  reader.readAsDataURL(input.files[0]);
  }
}
$("#replyPicsInp").change(function() {
  readURLReplypics(this);
});

// function readURLReplypics(input) {
//   if (input.files && input.files[0]) {
//     for(var i=0; i<input.files.length; i++) {
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         $('#replyPics').append("<img src='" + e.target.result + "' class='img-thumbnail'/>");
//       };
//       reader.readAsDataURL(input.files[i]);
//     }
//   }
// }
// $("#replyPicsInp").change(function() {
//   readURLReplypics(this);
// });
});
