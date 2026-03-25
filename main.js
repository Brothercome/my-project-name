// ============================================
//  DOR CAREERS — main.js
// ============================================

// ----- Hamburger menu -----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ----- Positions: dual filter (squad + type) -----
const squadFilter = document.getElementById('squadFilter');
const typeFilter  = document.getElementById('typeFilter');
const jobCards    = document.querySelectorAll('.job-card');
const creatorSection   = document.getElementById('creatorSection');
const communitySection = document.getElementById('communitySection');
const crossSection     = document.getElementById('crossSection');

if (squadFilter && typeFilter) {
  let activeSquad = 'all';
  let activeType  = 'all';

  function applyFilters() {
    jobCards.forEach(card => {
      const cardSquad = card.dataset.squad; // 'creator' | 'community' | 'both'
      const cardType  = card.dataset.type;

      const squadMatch =
        activeSquad === 'all' ||
        cardSquad   === activeSquad ||
        cardSquad   === 'both';

      const typeMatch =
        activeType === 'all' ||
        cardType   === activeType;

      card.classList.toggle('hidden', !(squadMatch && typeMatch));
    });

    // Section visibility: hide section header if all cards inside are hidden
    [creatorSection, communitySection, crossSection].forEach(section => {
      if (!section) return;
      const cards = section.querySelectorAll('.job-card');
      const anyVisible = [...cards].some(c => !c.classList.contains('hidden'));
      section.style.display = anyVisible ? '' : 'none';
    });
  }

  squadFilter.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      squadFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSquad = btn.dataset.squad;
      applyFilters();
    });
  });

  typeFilter.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      typeFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.type;
      applyFilters();
    });
  });
}

// ----- Scroll fade-in -----
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07 }
);

document.querySelectorAll(
  '.job-card, .stat-card, .perk-item, .step, .value-card, .referral-step, .sidebar-card, .advantage-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  observer.observe(el);
});
