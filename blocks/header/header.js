import { loadFragment } from '../fragment/fragment.js';
import { getMetadata } from '../../scripts/aem.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

// Load Remix Icon CSS
function loadRemixIcon() {
  if (!document.querySelector('link[href*="remixicon"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
    document.head.appendChild(link);
  }
}

function toggleMenu(nav) {
  const expanded = nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflow = expanded ? '' : 'hidden';
}

export default async function decorate(block) {
  // Load Remix Icon CSS first
  loadRemixIcon();

  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  const brand = document.createElement('div');
  brand.className = 'nav-brand';

  const sections = document.createElement('div');
  sections.className = 'nav-sections';

  const tools = document.createElement('div');
  tools.className = 'nav-tools';

  // Navigation items with icons
  const navItems = [
    { text: 'PHOTO PALACE STUDIOS', isBrand: true, icon: 'ri-camera-lens-line' },
    { text: 'Home', href: '#home', icon: 'ri-home-line' },
    { text: 'Services', href: '#services', icon: 'ri-service-line' },
    { text: 'Gallery', href: '#gallery', icon: 'ri-gallery-line' },
    { text: 'Contact', href: '#contact', icon: 'ri-phone-line' },
    { text: 'Feedback', href: '#feedback', icon: 'ri-feedback-line', isButton: true }
  ];

  navItems.forEach((item) => {
    if (item.isBrand) {
      brand.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
    } else if (item.isButton) {
      const a = document.createElement('a');
      a.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
      a.href = item.href;
      a.className = 'nav-feedback-btn';
      tools.append(a);
    } else {
      const a = document.createElement('a');
      a.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
      a.href = item.href;
      a.className = 'nav-link';
      sections.append(a);
    }
  });

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `
    <button aria-label="Toggle navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav));

  nav.append(hamburger, brand, sections, tools);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);

  isDesktop.addEventListener('change', () => {
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}