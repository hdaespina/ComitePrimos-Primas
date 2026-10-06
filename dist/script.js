const root = document.documentElement;
const motion = root.classList.contains('motion');
root.classList.add('motion-ready');

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

function splitWords(element, wordClass, masked) {
  const words = element.textContent.trim().split(/\s+/);
  element.textContent = '';
  words.forEach((word, index) => {
    const inner = document.createElement('span');
    inner.className = masked ? 'wi' : wordClass;
    inner.textContent = word;
    inner.style.setProperty('--wi', index);
    if (masked) {
      const outer = document.createElement('span');
      outer.className = wordClass;
      outer.append(inner);
      element.append(outer);
    } else {
      element.append(inner);
    }
    if (index < words.length - 1) element.append(' ');
  });
}

function countUp(element, delay) {
  const target = Number(element.dataset.count);
  const prefix = element.dataset.prefix || '';
  const duration = 1600;
  element.textContent = `${prefix}0`;
  setTimeout(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      element.textContent = `${prefix}${Math.round(target * eased)}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

if (motion) {
  document.querySelectorAll('[data-split]').forEach((el) => {
    if (el.children.length === 0) splitWords(el, 'w', true);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    const batchIndex = new Map();
    entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target)
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .forEach((el) => {
        const group = el.closest('[data-stagger]');
        if (group) {
          const n = batchIndex.get(group) || 0;
          batchIndex.set(group, n + 1);
          el.style.setProperty('--d', `${n * (Number(group.dataset.stagger) || 110)}ms`);
        }
        el.classList.add('is-in');
        revealObserver.unobserve(el);

        const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
        const counters = el.matches('[data-count]') ? [el] : el.querySelectorAll('[data-count]');
        counters.forEach((counter) => countUp(counter, delay));
      });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
}

const progressBar = document.querySelector('[data-scroll-progress]');
const rail = document.querySelector('[data-story-rail]');
const railList = rail?.querySelector('ol');
const timeline = motion ? document.querySelector('[data-timeline]') : null;
const timelineItems = timeline ? [...timeline.children] : [];
const heroPhoto = motion ? document.querySelector('.hero-photo') : null;
const scrollQuotes = motion
  ? [...document.querySelectorAll('[data-scroll-words]')].map((el) => {
      splitWords(el, 'sw', false);
      return { el, words: [...el.querySelectorAll('.sw')], lit: -1 };
    })
  : [];

function updateTimeline(viewport) {
  const line = viewport * 0.62;
  const circles = timelineItems.map((li) => li.querySelector('.timeline-index').getBoundingClientRect());
  timelineItems.forEach((li, i) => {
    const circle = circles[i];
    li.classList.toggle('is-active', circle.top + circle.height / 2 < line);
    if (i < timelineItems.length - 1) {
      const start = circle.bottom;
      const end = circles[i + 1].top;
      li.style.setProperty('--seg', clamp((line - start) / Math.max(end - start, 1)).toFixed(3));
    }
  });
}

function updateQuotes(viewport) {
  scrollQuotes.forEach((quote) => {
    const top = quote.el.getBoundingClientRect().top;
    const start = viewport * 0.9;
    const end = viewport * 0.35;
    const lit = Math.round(clamp((start - top) / (start - end)) * quote.words.length);
    if (lit === quote.lit) return;
    quote.words.forEach((word, i) => word.classList.toggle('is-lit', i < lit));
    quote.lit = lit;
  });
}

let ticking = false;

function update() {
  ticking = false;
  const y = window.scrollY;
  const viewport = window.innerHeight;
  header?.classList.toggle('is-scrolled', y > 16);

  const max = document.documentElement.scrollHeight - viewport;
  const progress = max > 0 ? clamp(y / max) : 0;
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  railList?.style.setProperty('--p', progress.toFixed(4));

  if (timeline) updateTimeline(viewport);
  if (scrollQuotes.length) updateQuotes(viewport);
  if (heroPhoto && y < viewport * 1.5) {
    heroPhoto.style.setProperty('--py', `${(clamp(y / viewport) * heroPhoto.offsetHeight * 0.045).toFixed(1)}px`);
  }
}

function requestUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

update();
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);

if (rail && 'IntersectionObserver' in window) {
  const links = new Map([...rail.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
  const setActive = (id) => {
    links.forEach((link, key) => {
      const active = key === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}

const stickyCta = document.querySelector('[data-sticky-cta]');
const topSection = document.querySelector('main section');
const joinSection = document.querySelector('#unirme, .reading-cta');

if (stickyCta && topSection && 'IntersectionObserver' in window) {
  let pastTop = false;
  let reachedJoin = false;

  const updateStickyCta = () => {
    stickyCta.classList.toggle('is-visible', pastTop && !reachedJoin);
  };

  const topObserver = new IntersectionObserver(([entry]) => {
    pastTop = !entry.isIntersecting;
    updateStickyCta();
  }, { rootMargin: '-72px 0px 0px 0px' });
  topObserver.observe(topSection);

  if (joinSection) {
    const joinObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        reachedJoin = true;
        updateStickyCta();
        joinObserver.disconnect();
      }
    }, { threshold: 0.1 });
    joinObserver.observe(joinSection);
  }
}

const shareButton = document.querySelector('[data-share-invite]');
const shareStatus = document.querySelector('[data-share-status]');

const shareData = {
  title: 'Primos & Primas — Comité Familiar',
  text: 'Conoce la historia y los beneficios del Comité Familiar de Ahorro y Préstamo Primos & Primas, y cómo hacerte socio.',
  url: `${window.location.origin}${window.location.pathname}`,
};

async function shareInvite() {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      // el familiar cerró el panel de compartir nativo sin elegir nada
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    if (shareStatus) shareStatus.textContent = 'Link copiado. Ahora puedes enviárselo a tu familiar.';
  } catch (error) {
    if (shareStatus) shareStatus.textContent = shareData.url;
  }
}

shareButton?.addEventListener('click', shareInvite);
