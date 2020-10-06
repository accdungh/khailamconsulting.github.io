import './config/app.js'

window.CommonJs = (function () {
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

      autosize($('.auto-size'));
    }
  }
})();

window.CommonJs.initJs();
