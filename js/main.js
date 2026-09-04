/* Camera Filmode landing — scroll reveal + screenshot lightbox.
   Same behaviour as the Video Compressor landing, minus the language dropdown
   (this site is English only). No dependencies, no build step. */
(function () {
  'use strict';

  /* ---------- Scroll reveal ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });

    /* Safety net: if the observer has revealed nothing at all by the time the
       page has settled, it is not working here (a tab that was never rendered,
       a browser that throttles it). Show everything rather than leave the page
       blank -- the animation is decoration, the content is not. */
    window.setTimeout(function () {
      var anyIn = false;
      Array.prototype.forEach.call(revealEls, function (el) {
        if (el.classList.contains('in')) anyIn = true;
      });
      if (anyIn) return;
      Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('in'); });
    }, 1500);
  }

  /* ---------- Screenshot lightbox ---------- */
  var LB_TEXT = { open: 'View full screen', close: 'Close', prev: 'Previous screenshot', next: 'Next screenshot' };
  var lbDialog = null;
  var lbImg = null;
  var lbCapText = null;
  var lbCount = null;
  var lbClose = null;
  var lbPrev = null;
  var lbNext = null;
  var lbShots = [];
  var lbIndex = 0;
  var lbLastFocus = null;

  function lbBuild() {
    var d = document.createElement('dialog');
    d.className = 'lightbox';
    if (!d.showModal) d.classList.add('is-fallback');
    d.innerHTML =
      '<div class="lightbox-inner">' +
        '<img class="lightbox-img" alt="">' +
        '<p class="lightbox-cap"><span class="lightbox-cap-text"></span><span class="lightbox-count"></span></p>' +
      '</div>' +
      '<button type="button" class="lightbox-close">&times;</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev">&#8249;</button>' +
      '<button type="button" class="lightbox-nav lightbox-next">&#8250;</button>';
    document.body.appendChild(d);

    lbDialog = d;
    lbImg = d.querySelector('.lightbox-img');
    lbCapText = d.querySelector('.lightbox-cap-text');
    lbCount = d.querySelector('.lightbox-count');
    lbClose = d.querySelector('.lightbox-close');
    lbPrev = d.querySelector('.lightbox-prev');
    lbNext = d.querySelector('.lightbox-next');

    lbClose.setAttribute('aria-label', LB_TEXT.close);
    lbPrev.setAttribute('aria-label', LB_TEXT.prev);
    lbNext.setAttribute('aria-label', LB_TEXT.next);

    lbClose.addEventListener('click', lbHide);
    lbPrev.addEventListener('click', function () { lbGo(-1); });
    lbNext.addEventListener('click', function () { lbGo(1); });

    /* Click on the backdrop area (anything but the image) closes. */
    d.addEventListener('click', function (e) {
      if (e.target === lbImg || (e.target.closest && e.target.closest('button'))) return;
      lbHide();
    });
    d.addEventListener('cancel', function (e) { e.preventDefault(); lbHide(); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); lbGo(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); lbGo(-1); }
      else if (e.key === 'Escape') { e.preventDefault(); lbHide(); }
    });

    var touchX = null;
    var touchY = null;
    d.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].clientX;
      touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    d.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      var dy = e.changedTouches[0].clientY - touchY;
      touchX = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) lbGo(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function lbRender() {
    var shot = lbShots[lbIndex];
    lbImg.src = shot.img.currentSrc || shot.img.src;
    lbImg.alt = shot.img.alt || '';
    lbCapText.textContent = shot.caption ? shot.caption.textContent : '';
    lbCount.textContent = (lbIndex + 1) + ' / ' + lbShots.length;
    var many = lbShots.length > 1;
    lbPrev.hidden = !many;
    lbNext.hidden = !many;
    /* Warm the neighbours so swiping feels instant. */
    [lbIndex - 1, lbIndex + 1].forEach(function (i) {
      var n = lbShots[(i + lbShots.length) % lbShots.length];
      if (n) { var pre = new Image(); pre.src = n.img.src; }
    });
  }

  function lbGo(step) {
    lbIndex = (lbIndex + step + lbShots.length) % lbShots.length;
    lbRender();
  }

  function lbShow(i) {
    lbIndex = i;
    lbLastFocus = document.activeElement;
    lbRender();
    document.body.style.overflow = 'hidden';
    if (lbDialog.showModal) lbDialog.showModal();
    else lbDialog.setAttribute('open', '');
    lbClose.focus();
  }

  function lbHide() {
    if (lbDialog.close) lbDialog.close(); else lbDialog.removeAttribute('open');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
  }

  var shotFigures = Array.prototype.slice.call(document.querySelectorAll('.shots figure'));
  shotFigures.forEach(function (fig) {
    var img = fig.querySelector('img');
    if (!img) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'shot-trigger';
    btn.setAttribute('aria-label', LB_TEXT.open);
    fig.insertBefore(btn, img);
    btn.appendChild(img);
    var i = lbShots.length;
    lbShots.push({ img: img, caption: fig.querySelector('figcaption') });
    btn.addEventListener('click', function () {
      if (!lbDialog) lbBuild();
      lbShow(i);
    });
  });

})();
