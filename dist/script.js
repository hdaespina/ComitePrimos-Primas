const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const copyButton = document.querySelector('[data-copy-interest]');
const copyStatus = document.querySelector('[data-copy-status]');

const interestMessage = 'Hola. Me gustaría conocer cómo formar parte del Comité Primos & Primas, cuáles son los requisitos y cuándo será la próxima reunión informativa.';

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

async function copyInterestMessage() {
  try {
    await navigator.clipboard.writeText(interestMessage);
    copyStatus.textContent = 'Mensaje copiado. Ahora puedes enviárselo a tu familiar.';
    copyButton.textContent = 'Mensaje copiado';
    window.setTimeout(() => {
      copyButton.textContent = 'Copiar mensaje de interés';
    }, 2600);
  } catch (error) {
    copyStatus.textContent = interestMessage;
    copyStatus.setAttribute('tabindex', '-1');
    copyStatus.focus();
  }
}

copyButton?.addEventListener('click', copyInterestMessage);

