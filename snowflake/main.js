(async function () {
  if (!('paintWorklet' in CSS)) {
    await import("https://unpkg.com/css-paint-polyfill");
  }

  CSS.paintWorklet.addModule('./worklet.js');

  const body = document.querySelector('#body');
  let start = performance.now();

  requestAnimationFrame(function raf(now) {
    body.style.setProperty('--animation-tick', now - start);
    requestAnimationFrame(raf);
  });
})();


