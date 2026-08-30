function normalizePages() {
  document.querySelectorAll('body .page').forEach(page => {
    if (page.parentElement !== document.body) {
      document.body.appendChild(page);
    }
  });
  ensurePageBackButtons();
}

function getBackTargetForPage(id) {
  const wellnessPages = new Set(['women','men','kids','pets','mindbody','longevity','autism','holisticpregnancy','menopause','sleep','antiinflammatory','gutmicrobiome','detox']);
  if (wellnessPages.has(id)) return { id: 'wellnesshub', label: 'Wellness Hub' };
  if (id === 'holistichealing') return { id: 'start', label: 'Start Here' };
  if (id === 'book') return { id: 'practitioners', label: 'Practitioners' };
  return { id: 'home', label: 'Home' };
}

function ensurePageBackButtons() {
  document.querySelectorAll('body > .page').forEach(page => {
    const id = page.id.replace(/^page-/, '');
    if (!id || id === 'home' || page.querySelector('.art-back,.rec-back,.page-auto-back')) return;
    const target = getBackTargetForPage(id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-auto-back';
    button.textContent = '\u2190 Back to ' + target.label;
    button.addEventListener('click', () => go(target.id));
    page.insertBefore(button, page.firstChild);
  });
}

function getRoute(id) {
  return (window.HV_ROUTE_REGISTRY || []).find(route => route.pageId === id);
}

function setMeta(name, value, attr) {
  if (!value) return;
  const key = attr || 'name';
  let el = document.head.querySelector(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(path) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = (window.HV_CANONICAL_ORIGIN || 'https://holisticvox.com') + path;
}

function updateRouteMeta(id) {
  const route = getRoute(id);
  if (!route) return;
  const title = route.title || 'HolisticVox';
  const description = route.seoDescription || 'HolisticVox educational wellness content and resources.';
  const canonicalPath = route.canonicalPath || '/' + id;
  document.title = title;
  setCanonical(canonicalPath);
  setMeta('description', description);
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', (window.HV_CANONICAL_ORIGIN || 'https://holisticvox.com') + canonicalPath, 'property');
  setMeta('og:image', (window.HV_CANONICAL_ORIGIN || 'https://holisticvox.com') + '/images/hero-main.jpg', 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
}

function go(id, pushHistory) {
  if (pushHistory === undefined) pushHistory = true;
  normalizePages();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pageTitles[id]) document.title = pageTitles[id];
    updateRouteMeta(id);
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.t-btn[onclick*="'${id}'"]`).forEach(b => b.classList.add('active'));
    setTimeout(triggerReveal, 80);
    if (pushHistory) {
      const slug = PAGE_SLUGS[id] || '/' + id;
      try { history.pushState({ page: id }, document.title, slug); } catch (e) {}
    }
  }
  closeDrawer();
}

function navTo(id) { go(id); }

function initPodcastBadges() {
  const stopWords = new Set(['the', 'and', 'with', 'dr', 'doctor', 'podcast', 'lab', 'method']);
  document.querySelectorAll('.pod-card').forEach(card => {
    const art = card.querySelector('.pod-art');
    const title = card.querySelector('.pod-info h3');
    if (!art || !title || art.querySelector('img')) return;
    const text = title.textContent
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = text.split(' ').filter(word => word && !stopWords.has(word.toLowerCase()));
    const initials = (words.length ? words : text.split(' '))
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    art.textContent = initials || 'HV';
    art.setAttribute('aria-label', title.textContent.trim() + ' channel');
  });
}

window.addEventListener('popstate', function(e) {
  const id = (e.state && e.state.page) ? e.state.page : 'home';
  go(id, false);
});

window.addEventListener('DOMContentLoaded', function() {
  normalizePages();
  initPodcastBadges();
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get('page');
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const queryPage = requestedPage === 'market' ? 'shop' : requestedPage;
  const id = queryPage || SLUG_TO_PAGE[path] || (path.length > 1 ? path.replace('/', '') : 'home');
  const page = document.getElementById('page-' + id);
  if (page && id !== 'home') {
    go(id, false);
    try { history.replaceState({ page: id }, document.title, PAGE_SLUGS[id] || path); } catch (e) {}
  } else {
    try { history.replaceState({ page: 'home' }, document.title, '/'); } catch (e) {}
  }
});

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// FULL TRANSLATION SYSTEM
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
function applyTranslations(lang) {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = LANG[lang][key] || LANG.en[key];
    if (val) el.innerHTML = val;
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = LANG[lang][key] || LANG.en[key];
    if (val) el.placeholder = val;
  });
  // HTML lang attribute
  document.getElementById('html-root').lang = lang;
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-tog button').forEach(b => {
    b.classList.toggle('active',
      (lang === 'en' && b.textContent.includes('EN')) ||
      (lang === 'es' && b.textContent.includes('ES'))
    );
  });
  applyTranslations(lang);
  toast(lang === 'es' ? 'Idioma cambiado a espa&#xF1;ol' : ' Switched to English');
}

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// DRAWER
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
document.getElementById('ham').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('drawer').classList.contains('open') ? 'hidden' : '';
});
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('ham').classList.remove('open');
  document.body.style.overflow = '';
}

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// SHOP FILTERS
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
document.querySelectorAll('.f-btn').forEach(b => b.addEventListener('click', function() {
  document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('active'));
  this.classList.add('active');
  const filter = this.dataset.filter || 'all';
  document.querySelectorAll('#page-shop .prod-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    const img = (card.querySelector('img')?.alt || '').toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase();
    const haystack = `${text} ${img} ${tags}`;
    const match =
      filter === 'all' || tags.split(/\s+/).includes(filter) ||
      (filter === 'supplements' && /supplement|ashwagandha|magnesium|probiotic|collagen|vitamin|turmeric|protein|fullscript|iherb|organifi|sigmatic/.test(haystack)) ||
      (filter === 'silver' && /silver|gold|colloidal|copper|platinum/.test(haystack)) ||
      (filter === 'gut' && /gut|probiotic|collagen|iherb|thrive|protein|digestive|psyllium|saccharomyces/.test(haystack)) ||
      (filter === 'women' && /women|lavender|probiotic|collagen|ashwagandha|iherb|thrive|vitex|maca|prenatal|menopause|shatavari/.test(haystack)) ||
      (filter === 'immune' && /immune|silver|vitamin c|vitamin d|elderberry|turmeric|probiotic|iherb/.test(haystack)) ||
      (filter === 'oils' && /oil|essential|lavender|mountain rose|diffuser|sesame/.test(haystack)) ||
      (filter === 'superfoods' && /superfood|turmeric|protein|organifi|sigmatic|thrive|iherb|maca|rhodiola|tulsi|mushroom/.test(haystack)) ||
      (filter === 'bach' && /bach|flower|mountain rose/.test(haystack)) ||
      (filter === 'pets' && /pet|dog|cat|zesty|fortiflora|vetri/.test(haystack)) ||
      (filter === 'autism' && /autism|folinic|magnesium|dha|melatonin|sensory/.test(haystack)) ||
      (filter === 'mind' && /mind|body|meditation|yoga|sound|singing|tuning|breath|blanket|lion/.test(haystack)) ||
      (filter === 'ayurveda' && /ayurveda|triphala|shatavari|tongue|sesame|neti/.test(haystack)) ||
      (filter === 'acupuncture' && /acupuncture|acupressure|ear seeds|tcm/.test(haystack));
    card.style.display = match ? '' : 'none';
  });
}));

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// NAV SCROLL
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
window.addEventListener('scroll', () =>
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 10),
  { passive: true }
);

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// SCROLL REVEAL
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
const obs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: .1 }
);
function triggerReveal() {
  document.querySelectorAll('.reveal:not(.visible),.feat-card:not(.visible)').forEach(el => obs.observe(el));
}
triggerReveal();

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
// TOAST
// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;

