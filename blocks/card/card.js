export default function decorate(block) {
  /* ----------------------------
     Enable smooth scrolling (safe fallback)
     Does NOT affect anything else
  ----------------------------- */
  if (!document.documentElement.style.scrollBehavior) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // Get all rows from DA Live table
  const rows = block.querySelectorAll(':scope > div');

  /* ----------------------------
     Create background wrapper
  ----------------------------- */
  const bgWrapper = document.createElement('div');
  bgWrapper.className = 'card-background';
  bgWrapper.id = 'services'; // ✅ anchor target for header navigation

  // First row contains background image and title
  const firstRow = rows[0];
  const firstCells = firstRow?.querySelectorAll('div');

  // Background image
  const bgImg = firstCells?.[0]?.querySelector('img');
  if (bgImg) {
    const bgImageDiv = document.createElement('div');
    bgImageDiv.className = 'background-image';
    bgImageDiv.appendChild(bgImg.cloneNode(true));
    bgWrapper.appendChild(bgImageDiv);
  }

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  bgWrapper.appendChild(overlay);

  /* ----------------------------
     Main container
  ----------------------------- */
  const container = document.createElement('div');
  container.className = 'services-container';

  // Title
  const titleText = firstCells?.[1]?.textContent.trim() || 'Our Services';
  const title = document.createElement('h2');
  title.className = 'services-title';
  title.textContent = titleText;
  container.appendChild(title);

  // Services list
  const cardList = document.createElement('ul');
  cardList.className = 'services-list';

  // Loop through service cards
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll(':scope > div');
    if (cells.length < 2) continue;

    const cardItem = document.createElement('li');
    cardItem.className = 'service-card';

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // Icon
    const img = cells[0].querySelector('img');
    if (img) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'card-icon';
      iconDiv.appendChild(img.cloneNode(true));
      cardContent.appendChild(iconDiv);
    }

    // Card title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-title';
    const cardHeading = document.createElement('h3');
    cardHeading.textContent = cells[1]?.textContent.trim() || '';
    titleDiv.appendChild(cardHeading);
    cardContent.appendChild(titleDiv);

    // Description
    if (cells[2]) {
      const descDiv = document.createElement('div');
      descDiv.className = 'card-description';
      const descText = document.createElement('p');
      descText.textContent = cells[2].textContent.trim();
      descDiv.appendChild(descText);
      cardContent.appendChild(descDiv);
    }

    cardItem.appendChild(cardContent);
    cardList.appendChild(cardItem);
  }

  container.appendChild(cardList);
  bgWrapper.appendChild(container);

  // Replace block content
  block.innerHTML = '';
  block.appendChild(bgWrapper);
}
