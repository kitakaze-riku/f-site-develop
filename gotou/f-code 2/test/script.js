gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 2.5, // seconds it takes to "catch up" to native scroll position
  effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
});

let sections = gsap.utils.toArray(".page");
const stopPanel = sections.findIndex((section) => section.dataset.pin);
console.log(stopPanel);
const tl = gsap
  .timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: true,
      end: "+=3000"
    }
  })
  .to(sections, {
    xPercent: -(100 * stopPanel),
    duration: stopPanel + 1
  })
  .to('.scroll1', {
    yPercent: -90,
    markers: true,
    ease: Power0.easeNone,
    duration: stopPanel + 1
  }).to(sections, {
    xPercent: -(100 * (sections.length - 1)),
    duration: stopPanel
  }).to('.scroll2', {
    yPercent: -90,
    markers: true,
    ease: Power0.easeNone,
    duration: stopPanel + 1
  }).to(sections, {
    xPercent: -(100 * (sections.length - 1)),
    duration: stopPanel + 1
  });