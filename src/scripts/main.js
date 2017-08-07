$(document).ready(function() {

  $("#contact").submit(function() {
    var $this = $(this);

    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $this.serialize(),
      beforeSend: function() {
        $this.find('.before-send').css("display", "block");
        $this.find('button[type="submit"]').prop("disabled");
        $this.find(".message-error").css("display", "none");
        $this.find(".message-spam").css("display", "none");
        $this.find(".message-complite").css("display", "none");
      }
    }).done(function( data ) {
      $this.find('.before-send').css("display", "none");
      $this.find('input[type="submit"]').prop("disabled", false);
      var jsondata = JSON.parse(data);
      if ( jsondata.status == "error" ) {
        $this.find(".message-error").css("display", "block");
      }
      else if ( jsondata.status == "spam" ) {
        $this.find(".message-spam").css("display", "block");
        $this.reset();
      }
      else if ( jsondata.status == "ok" ) {
        $this.find(".message-complite").css("display", "block");
        $this[0].reset();
      }
    }).fail(function() {
      $this.find('.before-send').css("display", "none");
      $this.find('input[type="submit"]').prop("disabled", false);
      $this.find(".message-error").css("display", "block");
    });
    return false;
  });

});

