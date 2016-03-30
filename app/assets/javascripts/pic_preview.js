$(document).ready(function() {
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
  var reader = new FileReader();
  if (input.files && input.files[0]) {
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
});
