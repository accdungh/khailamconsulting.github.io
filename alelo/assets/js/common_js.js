var CommonJs = (function () {
  return {
    initJs() {
      $('.datepicker-startdate').datepicker();
      $('.datepicker-enddate').datepicker();
      $('.scrollbar-inner').scrollbar();
      $("div[id^='addclass']").each(function () {

        var currentModal = $(this);

        //click next
        currentModal.find('.btn-invite').click(function () {
          currentModal.modal('hide');
          currentModal.closest("div[id^='addclass']").nextAll("div[id^='addclass']").first().modal('show');
        });

      });


      $('.table-lst-student input[type=checkbox]').on('change', function () {
      if($(this).prop('checked') == true)
          alert(123),
          $(".btn-show").show();  // checked

      else if(!$(".table-lst-student input[type=checkbox]:checked").length)
          $(".btn-show").hide();  // unchecked
      })

    }
  }
})();
