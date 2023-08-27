jQuery(document).ready(function ($) {

  let autoPlayDelay = 1500;

  let options = {
    init: true,
    // Optional parameters
    loop: false,

    autoplay: {
      delay: autoPlayDelay
    },

    // If we need pagination
    /*pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },*/

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  let mySwiper = new Swiper('.swiper-container', options);

  let slidersCount = mySwiper.params.loop ? mySwiper.slides.length - 2 : mySwiper.slides.length;
  let widthParts = 100 / slidersCount;

  $('.swiper-counter .total').html(slidersCount);
  for (let i = 0; i < slidersCount; i++) {
    $('.swiper-progress-bar .progress-sections').append('<span></span>');
  }

  function initProgressBar() {
    let calcProgress = (slidersCount - 1) * (autoPlayDelay + mySwiper.params.speed);
    calcProgress += autoPlayDelay;
    $('.swiper-progress-bar .progress').animate({
      width: '100%'
    }, calcProgress, 'linear');
  }

  initProgressBar();

  mySwiper.on('slideChange', function () {
    let progress = $('.swiper-progress-bar .progress');

    $('.swiper-counter .current').html(this.activeIndex + 1);

    if (
      (
        this.progress == -0 || (this.progress == 1 && this.params.loop)
      ) && !progress.parent().is('.stopped')
    ) {
      progress.css('width', '0');
      if (this.activeIndex == 0) {
        initProgressBar();
      }
    }

    if (progress.parent().is('.stopped')) {
      progress.animate({
        'width': Math.round(widthParts * (this.activeIndex + 1)) + '%'
      }, this.params.speed, 'linear');
    }
  });

  mySwiper.on('touchMove', function () {
    $('.swiper-progress-bar .progress').stop().parent().addClass('stopped');
  });


});