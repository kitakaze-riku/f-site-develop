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