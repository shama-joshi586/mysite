export default function decorate(block) {
  if (!block.classList.contains('card')) return;

  // Load RemixIcon once
  if (!document.querySelector('#remixicon')) {
    const link = document.createElement('link');
    link.id = 'remixicon';
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css';
    document.head.appendChild(link);
  }

  const icons = [
    'ri-hearts-fill',
    'ri-cake-2-fill',
    'ri-emotion-happy-line',
    'ri-briefcase-4-fill',
  ];

  // Wait for DA Live hydration
  requestAnimationFrame(() => {
    const cards = block.querySelectorAll(
      ':scope > div:last-child > div'
    );

    cards.forEach((card, i) => {
      // prevent duplicates
      if (card.querySelector('.service-icon')) return;

      // skip empty cards
      if (!card.textContent.trim()) return;

      const icon = document.createElement('i');
      icon.className = `service-icon ${icons[i] || ''}`;
      card.prepend(icon);
    });
  });
}
