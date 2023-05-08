(function () {
  const lazyImages = document.querySelectorAll('.lazy-image');

  for (const image of lazyImages) {
    image.src = image.dataset.src;
    image.classList.remove('lazy-image');
    image.removeAttribute('data-src');
  }
})();
