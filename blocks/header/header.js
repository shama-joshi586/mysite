function normalizeNavSections(nav) {
  const navSections = nav.querySelector('.nav-sections');
  if (!navSections) return;

  let ul = navSections.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    navSections.append(ul);
  }

  navSections.querySelectorAll('a, span').forEach((item) => {
    if (item.closest('li')) return;
    const li = document.createElement('li');
    li.append(item);
    ul.append(li);
  });
}
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function toggleMenu(nav) {
  const expanded = nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflow = expanded ? '' : 'hidden';
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : '/nav';

  const fragment = await loadFragment(navPath);
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  /* Assign DA slots */
  ['brand', 'sections', 'tools'].forEach((name, i) => {
    nav.children[i]?.classList.add(`nav-${name}`);
  });

  /* Feedback → button */
  const toolLink = nav.querySelector('.nav-tools a');
  if (toolLink) {
    toolLink.classList.add('button', 'primary');
  }

  /* Remove h2 and h4 tags, keep text content */
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const h2 = navBrand.querySelector('h2');
    if (h2) {
      const logoText = document.createElement('div');
      logoText.className = 'logo';
      logoText.textContent = h2.textContent;
      h2.replaceWith(logoText);
    }
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    const navLinks = navSections.querySelectorAll('h4');
    navLinks.forEach(h4 => {
      const link = h4.querySelector('a');
      if (link) {
        h4.replaceWith(link);
      } else {
        const span = document.createElement('span');
        span.textContent = h4.textContent;
        h4.replaceWith(span);
      }
    });
  }

  /* Hamburger */
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `
    <button aria-label="Toggle navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav));
  nav.prepend(hamburger);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);

  block.append(wrapper);

  isDesktop.addEventListener('change', () => {
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}
