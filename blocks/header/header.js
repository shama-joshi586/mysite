export default function decorate(block) {
  if (!block.classList.contains('nav')) return;

  // Load Remix Icons
  if (!document.querySelector('#remixicon')) {
    const link = document.createElement('link');
    link.id = 'remixicon';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css';
    document.head.appendChild(link);
  }

  const icons = [
    'ri-landscape-fill', // Logo
    'ri-home-4-line',    // Home
    'ri-camera-line',    // Services
    'ri-image-line',     // Gallery
    'ri-phone-line',     // Contact
  ];

  const items = block.querySelectorAll(':scope > div');

  items.forEach((item, i) => {
    if (!icons[i]) return;

    // Add a general class for nav items
    item.classList.add('nav-item');
    
    // Check if it's the logo (first item) or the Feedback button (last item)
    if (i === 0) item.classList.add('nav-logo');
    if (i === items.length - 1) item.classList.add('nav-cta');

    const inner = item.querySelector('div');
    if (!inner) return;

    const icon = document.createElement('i');
    icon.className = icons[i];
    inner.prepend(icon);
  });
}