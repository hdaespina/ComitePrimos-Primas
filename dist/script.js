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

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const stickyCta = document.querySelector('[data-sticky-cta]');
const topSection = document.querySelector('main section');
const joinSection = document.querySelector('#unirme');

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

