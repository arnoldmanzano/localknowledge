$(document).ready(function() {
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
