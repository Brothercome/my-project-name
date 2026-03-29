// Event tracking for GA4
(function() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;

    var text = link.textContent.trim();
    var href = link.getAttribute('href') || '';
    var page = window.location.pathname;

    // 지원하기 / Apply 버튼
    if (text === '지원하기' || text === 'Apply') {
      gtag('event', 'apply_click', {
        page_path: page,
        button_text: text,
        destination: href
      });
    }

    // 커피챗 신청 / Coffee Chat
    if (text.indexOf('커피챗') !== -1 || text.indexOf('Coffee Chat') !== -1) {
      gtag('event', 'coffeechat_click', {
        page_path: page,
        button_text: text
      });
    }

    // 포지션 보기 / View Positions
    if (text.indexOf('포지션 보기') !== -1 || text.indexOf('View Positions') !== -1 || text.indexOf('채용공고 확인') !== -1) {
      gtag('event', 'view_positions_click', {
        page_path: page,
        button_text: text
      });
    }

    // 자세히 보기 / Learn More (job card click)
    if (text.indexOf('자세히 보기') !== -1 || text.indexOf('Learn More') !== -1) {
      gtag('event', 'job_detail_click', {
        page_path: page,
        destination: href,
        button_text: text
      });
    }

    // 인재 추천하기 / Refer
    if (text.indexOf('인재 추천') !== -1 || text.indexOf('Refer') !== -1) {
      gtag('event', 'referral_click', {
        page_path: page
      });
    }

    // ENG/KOR 언어 전환
    if (link.classList.contains('btn-lang')) {
      gtag('event', 'language_switch', {
        page_path: page,
        to_language: text
      });
    }
  });
})();
