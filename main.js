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

// ----- Positions: squad (section-level) + type (card-level) filter -----
const squadFilter     = document.getElementById('squadFilter');
const typeFilter      = document.getElementById('typeFilter');
const jobCards        = document.querySelectorAll('.job-card');
const creatorSection   = document.getElementById('creatorSection');
const communitySection = document.getElementById('communitySection');
const growthSection    = document.getElementById('growthSection');
const internshipSection = document.getElementById('internshipSection');

const allSections = [creatorSection, communitySection, growthSection, internshipSection];
const sectionSquadMap = {
  creator: creatorSection,
  community: communitySection,
  growth: growthSection,
  internship: internshipSection,
};

if (squadFilter && typeFilter) {
  let activeSquad = 'all';
  let activeType  = 'all';

  function applyFilters() {
    // Squad filter: section-level visibility
    allSections.forEach(section => {
      if (!section) return;
      if (activeSquad === 'all') {
        section.style.display = '';
      } else {
        section.style.display = (sectionSquadMap[activeSquad] === section) ? '' : 'none';
      }
    });

    // Type filter: card-level within visible sections
    jobCards.forEach(card => {
      const typeMatch = activeType === 'all' || card.dataset.type === activeType;
      // Make filtered-in cards immediately visible (no fade-in delay)
      if (typeMatch) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide sections where all cards are hidden by type filter
    allSections.forEach(section => {
      if (!section || section.style.display === 'none') return;
      const cards = section.querySelectorAll('.job-card');
      const anyVisible = [...cards].some(c => !c.classList.contains('hidden'));
      if (!anyVisible) section.style.display = 'none';
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
  '.job-card, .stat-card, .perk-item, .step, .value-card, .referral-step, .sidebar-card, .advantage-card, .value-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  observer.observe(el);
});

// Marquee is handled purely by CSS (see style.css .investors-track)
