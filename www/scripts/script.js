(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Мобильное меню: закрывается по ссылке, Escape и клику мимо
  var menu = document.querySelector('.menu');
  if (menu) {
    var summary = menu.querySelector('summary');
    menu.addEventListener('click', function (e) {
      if (e.target.closest('.menu__panel a')) menu.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) {
        menu.open = false;
        if (summary) summary.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
  }

  // Нижняя кнопка на телефоне: видна, пока на экране нет кнопок героя и блока контакта
  var bar = document.getElementById('mbar');
  var heroButtons = document.querySelector('.hero__buttons');
  var contact = document.getElementById('contact');
  if (bar && heroButtons && contact && 'IntersectionObserver' in window) {
    var seen = { hero: true, contact: false };
    var mobile = window.matchMedia('(max-width: 719px)');

    var setBar = function (on) {
      bar.classList.toggle('is-on', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (on) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
    };
    var update = function () {
      setBar(mobile.matches && !seen.hero && !seen.contact);
    };

    setBar(false);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.target === heroButtons) seen.hero = en.isIntersecting;
        if (en.target === contact) seen.contact = en.isIntersecting;
      });
      update();
    }, { rootMargin: '-56px 0px 0px 0px' });
    io.observe(heroButtons);
    io.observe(contact);
    if (mobile.addEventListener) mobile.addEventListener('change', update);
  }

  // Шаблон брифа: текст в буфер, видимый текст = буфер
  var btn = document.getElementById('copy-brief');
  var note = document.getElementById('brief');
  var live = document.getElementById('brief-live');
  if (btn && note) {
    var label = btn.textContent;
    var timer = 0;

    var say = function (text, ms, announce) {
      btn.textContent = text;
      if (live && announce) live.textContent = announce;
      clearTimeout(timer);
      timer = setTimeout(function () {
        btn.textContent = label;
        if (live) live.textContent = '';
      }, ms);
    };
    var briefText = function () {
      return Array.prototype.map.call(note.querySelectorAll('p'), function (p) {
        return p.textContent;
      }).join('\n');
    };
    var selectNote = function () {
      var range = document.createRange();
      range.selectNodeContents(note);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    var fallback = function () {
      selectNote();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      if (ok) {
        say('Скопировано', 2400, 'Шаблон брифа скопирован');
      } else {
        say('Выделите текст ниже', 4000);
        note.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      }
    };

    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(briefText()).then(function () {
          say('Скопировано', 2400, 'Шаблон брифа скопирован');
        }, fallback);
      } else {
        fallback();
      }
    });
  }
})();
