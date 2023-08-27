// 横スクロール

window.addEventListener("load", function () {

  let mm = gsap.matchMedia();

  // add a media query. When it matches, the associated function will run
  mm.add("(min-width: 768px)", () => {


    //プラグインを定義
    gsap.registerPlugin(ScrollTrigger);

    const area = document.querySelector(".consept-content");
    const wrap = document.querySelector(".consept-wrap");
    const items = document.querySelectorAll(".scroll-item");
    const num = items.length;

    //横幅を指定
    gsap.set(wrap, { width: num * 100 + "%" });
    gsap.set(items, { width: 100 / num + "%" });

    gsap.to(items, {
      xPercent: -100 * (num - 1), //x方向に移動させるnum後の数字大きいと細かく動く
      ease: "none",
      scrollTrigger: {
        trigger: area, //トリガー
        start: "top top", //開始位置
        end: "+=1000", //終了位置
        pin: true, //ピン留め
        scrub: 1.5, //スクロール量に応じて動かすtrueがデフォルトカクカク
      }
    });
  });
});

// 横スクロール時に画像ズームイン

// window.addEventListener('scroll', () => {
//   let elem = document.getElementById('consept-scroll');
//   let scrollY = window.scrollY / 10;
//   elem.style.backgroundSize = 100 + scrollY + '%';
// });

jQuery(document).ready(function ($) {

  let autoPlayDelay = 3000;

  let options = {
    init: true,
    // Optional parameters
    loop: false,
    effect: 'fade',
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