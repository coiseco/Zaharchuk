(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Шапка: линия появляется после прокрутки
  var header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Мобильное меню
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.classList.toggle('is-open', open);
  }
  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Таймкод в видоискателе героя
  var tc = document.getElementById('timecode');
  if (tc && !reduce) {
    var t = 0;
    setInterval(function () {
      t += 1;
      var m = String(Math.floor(t / 60) % 60).padStart(2, '0');
      var s = String(t % 60).padStart(2, '0');
      tc.textContent = '00:' + m + ':' + s;
    }, 1000);
  }

  // Услуги: арка с кадром следует за курсором
  var list = document.getElementById('svc');
  var preview = document.getElementById('preview');
  var canHover = window.matchMedia('(hover: hover) and (min-width: 861px)');
  if (list && preview && canHover.matches && !reduce) {
    var x = 0, y = 0, tx = 0, ty = 0, raf = 0;

    function tick() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      preview.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    }

    list.addEventListener('mouseover', function (e) {
      var row = e.target.closest('.svc__row');
      if (!row) return;
      var src = row.getAttribute('data-img');
      if (preview.getAttribute('src') !== src) preview.setAttribute('src', src);
      preview.classList.add('is-on');
    });
    list.addEventListener('mouseleave', function () {
      preview.classList.remove('is-on');
    });
    list.addEventListener('mousemove', function (e) {
      if (!preview.classList.contains('is-on') && !raf) { x = e.clientX; y = e.clientY; }
      tx = e.clientX + 120;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }

  // Появление блоков при прокрутке. Без IntersectionObserver всё остаётся видимым.
  if ('IntersectionObserver' in window && !reduce) {
    var targets = document.querySelectorAll(
      '.head, .about__text, .about__photo, .about__brands, .quote, .course, .faq__title, .qa, .contact__copy, .contact__photo, .footer__title'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
