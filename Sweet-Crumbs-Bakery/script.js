/* ============================================================
   Sweet Crumbs Bakery — script.js
   Plain JavaScript, no dependencies required.
   ============================================================ */

/* ── State ───────────────────────────────────────────────── */
let currentPage  = 'home';
let darkMode     = false;
let countersDone = false;

/* ── Navigation ─────────────────────────────────────────── */
function navigate(page) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMenu();
  runReveal();

  if (page === 'about' && !countersDone) {
    countersDone = true;
    animateCounters();
  }
}

/* ── Mobile Menu ─────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
}

/* ── Dark Mode ───────────────────────────────────────────── */
function toggleDark() {
  darkMode = !darkMode;
  document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.getElementById('theme-btn').textContent = darkMode ? 'Light Mode' : 'Dark Mode';
}

/* ── Scroll Reveal ───────────────────────────────────────── */
function runReveal() {
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.93) {
        el.classList.add('visible');
      }
    });
  }, 50);
}

window.addEventListener('scroll', function () {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.93) {
      el.classList.add('visible');
    }
  });

  /* Scroll-to-top button */
  const btn = document.getElementById('scroll-top-btn');
  if (btn) btn.classList.toggle('show', window.scrollY > 300);
}, { passive: true });

/* ── Scroll Top ──────────────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Counter Animation ───────────────────────────────────── */
const STAT_TARGETS = [12, 50, 15000, 98];

function animateCounters() {
  const els = document.querySelectorAll('.stat-box .num');
  if (!els.length) return;
  const steps = 60;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    els.forEach((el, i) => {
      const val = step >= steps ? STAT_TARGETS[i] : Math.floor((STAT_TARGETS[i] / steps) * step);
      el.textContent = val.toLocaleString();
    });
    if (step >= steps) clearInterval(timer);
  }, 22);
}

/* ── FAQ Accordion ───────────────────────────────────────── */
document.addEventListener('click', function (e) {
  const q = e.target.closest('.faq-question');
  if (!q) return;
  const item = q.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
});

/* ── Gallery Filter ──────────────────────────────────────── */
function setFilter(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  document.querySelectorAll('.gallery-item').forEach(item => {
    const match = cat === 'all' || item.dataset.cat === cat;
    item.classList.toggle('hidden', !match);
  });
}

/* ── Lightbox ────────────────────────────────────────────── */
function openLightbox(src, title) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lb-img').src = src.replace('w=500', 'w=580');
  document.getElementById('lb-title').textContent = title;
  lb.classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('click', function (e) {
  if (e.target.id === 'lightbox') closeLightbox();
});

/* ── Menu Search ─────────────────────────────────────────── */
function handleMenuSearch(e) {
  const term = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.category-block').forEach(block => {
    let visible = 0;
    block.querySelectorAll('.card').forEach(card => {
      const text = card.textContent.toLowerCase();
      const show = !term || text.includes(term);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    block.style.display = visible > 0 ? '' : 'none';
  });
}

/* ── Form Validation ─────────────────────────────────────── */
function validateForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[0-9+\-\s()]{7,}$/;

    form.querySelectorAll('.form-group').forEach(group => {
      const input = group.querySelector('input, textarea, select');
      if (!input) return;
      let ok = input.value.trim().length > 0;
      if (input.type === 'email') ok = emailRe.test(input.value.trim());
      if (input.type === 'tel')   ok = phoneRe.test(input.value.trim());
      group.classList.toggle('error', !ok);
      if (!ok) valid = false;
    });

    if (valid) {
      form.reset();
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
      const msg = document.getElementById(successId);
      if (msg) {
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 4500);
      }
    }
  });
}

/* ── Newsletter ──────────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  if (!input || !input.value) return;
  input.value = '';
  const msg = document.getElementById('newsletter-success');
  if (msg) {
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 5000);
  }
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  /* Loader */
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 900);

  /* Wire nav links */
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.addEventListener('click', () => navigate(a.dataset.page));
  });

  /* Logo */
  const logo = document.querySelector('.logo');
  if (logo) logo.addEventListener('click', () => navigate('home'));

  /* Footer quick links */
  document.querySelectorAll('a[data-page]').forEach(a => {
    a.addEventListener('click', () => navigate(a.dataset.page));
  });

  /* CTA banners */
  const ctaMenu = document.getElementById('cta-menu-btn');
  if (ctaMenu) ctaMenu.addEventListener('click', () => navigate('menu'));
  const ctaContact = document.getElementById('cta-contact-btn');
  if (ctaContact) ctaContact.addEventListener('click', () => navigate('contact'));
  const heroMenu = document.getElementById('hero-menu-btn');
  if (heroMenu) heroMenu.addEventListener('click', () => navigate('menu'));
  const heroContact = document.getElementById('hero-contact-btn');
  if (heroContact) heroContact.addEventListener('click', () => navigate('contact'));
  const qo = document.getElementById('quick-order-btn');
  if (qo) qo.addEventListener('click', () => navigate('menu'));

  /* Gallery default filter */
  setFilter('all');

  /* Forms */
  validateForm('contact-form', 'contact-success');
  validateForm('cake-form',    'cake-success');

  /* Newsletter */
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) nlForm.addEventListener('submit', handleNewsletter);

  /* Initial reveal */
  runReveal();

  /* Order buttons */
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const name = this.closest('.card')?.querySelector('h3')?.textContent || 'item';
      alert('Thank you! "' + name + '" added to your order. We will contact you to confirm details.');
    });
  });
});
