import './config/app.js'

window.CommonJs = (function () {

  

  function compareDates() {
    var startDate = $('.datepicker-startdate').first().datepicker('getDate');
    var endDate = $('.datepicker-enddate').first().datepicker('getDate');

    $('.date-error-message').text(startDate && endDate && startDate > endDate && "Start Date should not be before End Date" || "")
  }

  return {
    initJs() {
      $('.datepicker-startdate').datepicker();
      $('.datepicker-enddate').datepicker();
      $(document).on('change', '.datepicker-startdate, .datepicker-enddate', compareDates);
      $('.scrollbar-inner').scrollbar();
      $('[data-toggle="tooltip"]').tooltip();

      $("div[id^='addclass']").each(function () {

        var currentModal = $(this);

        //click next
        currentModal.find('.btn-invite').click(function () {
          currentModal.modal('hide');
          currentModal.closest("div[id^='addclass']").nextAll("div[id^='addclass']").first().modal('show');
        });

        //click prev
        currentModal.find('.btn-add-more').click(function () {
          currentModal.modal('hide');
          currentModal.closest("div[id^='addclass']").prevAll("div[id^='addclass']").first().modal('show');
        });

      });

      autosize($('.auto-size'));
    },

    initHorizontalScrollBar() {
      var scrollBarWidths = $('.nav-item.nav-link').outerWidth();

      var widthOfList = function(){
        var itemsWidth = 0;
        $('.list-nav a').each(function(){
          var itemWidth = $(this).outerWidth();
          itemsWidth+=itemWidth;
        });
        return itemsWidth;
      };

      var widthOfHidden = function(){
          var ww = 0 - $('.wrap-scrollbar-nav').outerWidth();
          var hw = (($('.wrap-scrollbar-nav').outerWidth())-widthOfList()-getLeftPosi())-scrollBarWidths;
          var rp = $(document).width() - ($('.nav-item.nav-link').last().offset().left + $('.nav-item.nav-link').last().outerWidth());
          
          if (ww>hw) {
              //return ww;
              return (rp>ww?rp:ww);
          }
          else {
              //return hw;
              return (rp>hw?rp:hw);
          }
      };

      var getLeftPosi = function(){
          
          var ww = 0 - $('.wrap-scrollbar-nav').outerWidth();
          var lp = $('.list-nav').position().left;
          
          if (ww>lp) {
              return ww;
          }
          else {
              return lp;
          }
      };

      var reAdjust = function(){
        
        // check right pos of last nav item
        var rp = $(document).width() - ($('.nav-item.nav-link').last().offset().left + $('.nav-item.nav-link').last().outerWidth());

        if (($('.wrap-scrollbar-nav').outerWidth()) < widthOfList() && (rp<0)) {
          $('.scroller-right').show().css('display', 'flex');
        }
        else {
          $('.scroller-right').hide();
        }
        
        if (getLeftPosi()<0) {
          $('.scroller-left').show().css('display', 'flex');
        }
        else {
          $('.scroller-left').animate({left:"-="+getLeftPosi()+"px"},'slow');
          $('.scroller-left').hide();
        }
      }

      reAdjust();

      $(window).on('resize',function(e){  
          reAdjust();
      });

      $('.scroller-right').click(function() {
        
        $('.scroller-left').fadeIn('slow');
        $('.scroller-right').fadeOut('slow');
        
        $('.list-nav').animate({left:"+="+widthOfHidden()+"px"},'slow',function(){
          reAdjust();
        });
      });

      $('.scroller-left').click(function() {
        
        $('.scroller-right').fadeIn('slow');
        $('.scroller-left').fadeOut('slow');
        $('.list-nav').animate({left:"-="+getLeftPosi()+"px"},'slow',function(){
            reAdjust();
          });
      });
    }

  }
})();

window.CommonJs.initJs();
