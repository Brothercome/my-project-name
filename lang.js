// Language detection + cookie persistence
(function() {
  var COOKIE = 'dor_lang';

  function getCookie(name) {
    var m = document.cookie.match('(^|;)\\s*' + name + '=([^;]*)');
    return m ? m[2] : null;
  }

  function setCookie(name, val) {
    document.cookie = name + '=' + val + ';path=/;max-age=31536000000;SameSite=Lax';
  }

  // When user clicks KOR/ENG button, save preference
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.btn-lang');
    if (!link) return;
    var text = link.textContent.trim();
    if (text === 'ENG') setCookie(COOKIE, 'en');
    if (text === 'KOR') setCookie(COOKIE, 'ko');
  });

  // Auto-redirect on Korean pages only
  var lang = document.documentElement.lang;
  if (lang !== 'ko') return;

  var saved = getCookie(COOKIE);

  // If user explicitly chose Korean, don't redirect
  if (saved === 'ko') return;

  // If user chose English, or browser is not Korean
  var isKorean = saved === null && /^ko/i.test(navigator.language || navigator.userLanguage || '');
  if (saved === 'en' || (!saved && !isKorean)) {
    // Map current KR path to EN path
    var path = window.location.pathname;
    var enPath;
    if (path === '/' || path === '/index' || path === '/index.html') {
      enPath = '/en';
    } else if (path.indexOf('/position/') === 0) {
      enPath = path.replace(/\/?$/, '/en');
    } else {
      // /positions → /positions/en, /values → /values/en, etc.
      enPath = path.replace(/\/?$/, '/en');
    }
    window.location.replace(enPath);
  }
})();
