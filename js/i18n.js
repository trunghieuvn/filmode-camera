/* FilCam landing — language picker.
   English is the page's own markup: on load every [data-i18n*] node's English
   is captured, and another language is fetched from i18n/<code>.json on demand
   and swapped in (a missing key keeps the English). The choice comes from
   ?lang=, then the one the visitor picked last (shared with /ios), then English
   — never from the browser's language. No dependencies, no build step. */
(function () {
  'use strict';

  var LANGS = [
    { code: 'en', label: 'English', html: 'en' },
    { code: 'vi', label: 'Tiếng Việt', html: 'vi' },
    { code: 'ja', label: '日本語', html: 'ja' },
    { code: 'ko', label: '한국어', html: 'ko' },
    { code: 'zh', label: '简体中文', html: 'zh-Hans' },
    { code: 'ar', label: 'العربية', html: 'ar', rtl: true },
    { code: 'hi', label: 'हिन्दी', html: 'hi' },
    { code: 'fr', label: 'Français', html: 'fr' },
    { code: 'id', label: 'Bahasa Indonesia', html: 'id' }
  ];
  var KEY = 'filcam-lang';
  var VERSION = '20260923';
  /* Strings that live in script, not in the markup. */
  var EN = {
    'lb.open': 'View full screen',
    'lb.close': 'Close',
    'lb.prev': 'Previous screenshot',
    'lb.next': 'Next screenshot'
  };
  var ATTRS = [
    ['data-i18n', function (el, v) { el.textContent = v; }, function (el) { return el.textContent; }],
    ['data-i18n-html', function (el, v) { el.innerHTML = v; }, function (el) { return el.innerHTML; }],
    ['data-i18n-alt', function (el, v) { el.alt = v; }, function (el) { return el.alt; }],
    ['data-i18n-content', function (el, v) { el.setAttribute('content', v); }, function (el) { return el.getAttribute('content'); }],
    ['data-i18n-aria', function (el, v) { el.setAttribute('aria-label', v); }, function (el) { return el.getAttribute('aria-label'); }]
  ];

  ATTRS.forEach(function (a) {
    Array.prototype.forEach.call(document.querySelectorAll('[' + a[0] + ']'), function (el) {
      var k = el.getAttribute(a[0]);
      if (!(k in EN)) EN[k] = a[2](el).trim();
    });
  });

  var dict = EN;
  var current = 'en';
  var listeners = [];
  var cache = { en: EN };

  function find(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i];
    return null;
  }

  function t(key) { return (dict && dict[key]) || EN[key] || ''; }

  function store(code) {
    try { localStorage.setItem(KEY, code); } catch (e) { /* private mode */ }
  }

  /* The iOS page at /ios shares the stored choice and also has Traditional
     Chinese; this page only has Simplified, which is the closer fallback. */
  function alias(code) { return code && code.indexOf('zh') === 0 ? 'zh' : code; }

  function initial() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { /* old browser */ }
    q = alias(q && q.toLowerCase());
    if (q && find(q)) return q;
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
    saved = alias(saved);
    return saved && find(saved) ? saved : 'en';
  }

  function load(code) {
    if (cache[code]) return Promise.resolve(cache[code]);
    return fetch('i18n/' + code + '.json?v=' + VERSION)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { cache[code] = d; return d; });
  }

  function apply(code, d) {
    var lang = find(code);
    current = code;
    dict = d;
    document.documentElement.lang = lang.html;
    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
    ATTRS.forEach(function (a) {
      Array.prototype.forEach.call(document.querySelectorAll('[' + a[0] + ']'), function (el) {
        a[1](el, t(el.getAttribute(a[0])));
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('img[data-shot]'), function (img) {
      img.src = 'screenshots/' + code + '/' + img.getAttribute('data-shot') + '.jpg';
    });
    if (label) label.textContent = lang.label;
    Array.prototype.forEach.call(items, function (it) {
      it.setAttribute('aria-checked', it.getAttribute('data-lang') === code ? 'true' : 'false');
    });
    listeners.forEach(function (fn) { fn(code); });
  }

  function setLang(code, remember) {
    if (!find(code)) code = 'en';
    if (remember) store(code);
    return load(code).then(function (d) { apply(code, d); }, function () {
      if (code !== 'en') apply('en', EN);
    });
  }

  /* ---------- The dropdown ---------- */
  var btn = document.getElementById('lang-btn');
  var menu = btn && btn.parentNode.querySelector('.lang-menu');
  var label = btn && btn.querySelector('.lang-btn-label');
  var items = [];

  if (btn && menu) {
    var check = '<svg class="check" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    menu.innerHTML = LANGS.map(function (l) {
      return '<button type="button" role="menuitemradio" aria-checked="false" data-lang="' + l.code +
        '" lang="' + l.html + '"' + (l.rtl ? ' dir="rtl"' : '') + ' tabindex="-1"><span>' + l.label + '</span>' + check + '</button>';
    }).join('');
    items = menu.querySelectorAll('[role=menuitemradio]');

    var open = function (focusCurrent) {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      var cur = menu.querySelector('[data-lang="' + current + '"]') || items[0];
      if (focusCurrent) cur.focus();
    };
    var close = function (refocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (refocus) btn.focus();
    };
    var focusAt = function (i) { items[(i + items.length) % items.length].focus(); };
    var indexOf = function (el) { return Array.prototype.indexOf.call(items, el); };

    btn.addEventListener('click', function () { if (menu.hidden) open(false); else close(false); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); open(true);
      }
    });
    menu.addEventListener('click', function (e) {
      var it = e.target.closest && e.target.closest('[data-lang]');
      if (!it) return;
      setLang(it.getAttribute('data-lang'), true);
      close(true);
    });
    menu.addEventListener('keydown', function (e) {
      var i = indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); focusAt(i + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); focusAt(i - 1); }
      else if (e.key === 'Home') { e.preventDefault(); focusAt(0); }
      else if (e.key === 'End') { e.preventDefault(); focusAt(items.length - 1); }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') { close(false); }
    });
    document.addEventListener('click', function (e) {
      if (!btn.parentNode.contains(e.target)) close(false);
    });
  }

  window.filcamI18n = {
    t: t,
    lang: function () { return current; },
    onChange: function (fn) { listeners.push(fn); }
  };

  var first = initial();
  if (first !== 'en') setLang(first, false);
  else apply('en', EN);
})();
