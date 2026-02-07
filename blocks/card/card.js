export default function decorate(block) {
  // Get all rows from DA Live table
  const rows = block.querySelectorAll(':scope > div');
  
  // Create background wrapper
  const bgWrapper = document.createElement('div');
  bgWrapper.className = 'card-background';
  
  // First row contains background image and title
  const firstRow = rows[0];
  const firstCells = firstRow?.querySelectorAll('div');
  
  // Get background image from first cell
  const bgImg = firstCells[0]?.querySelector('img');
  if (bgImg) {
    const bgImageDiv = document.createElement('div');
    bgImageDiv.className = 'background-image';
    const bgImgClone = bgImg.cloneNode(true);
    bgImageDiv.appendChild(bgImgClone);
    bgWrapper.appendChild(bgImageDiv);
  }
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  bgWrapper.appendChild(overlay);
  
  // Create main container
  const container = document.createElement('div');
  container.className = 'services-container';

  // Get title from second cell of first row
  const titleText = firstCells[1]?.textContent.trim() || 'Our Services';
  
  // Create title
  const title = document.createElement('h2');
  title.className = 'services-title';
  title.textContent = titleText;
  container.appendChild(title);

  // Create ul for cards
  const cardList = document.createElement('ul');
  cardList.className = 'services-list';

  // Loop through remaining rows for cards (skip first row)
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].querySelectorAll(':scope > div');
    if (cells.length < 2) continue;

    // Create li for each card
    const cardItem = document.createElement('li');
    cardItem.className = 'service-card';

    // Create card content wrapper
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // Get icon image from first cell
    const img = cells[0].querySelector('img');
    
    if (img) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'card-icon';
      const iconImg = img.cloneNode(true);
      iconDiv.appendChild(iconImg);
      cardContent.appendChild(iconDiv);
    }

    // Create title div from second cell
    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-title';
    
    const cardHeading = document.createElement('h3');
    cardHeading.textContent = cells[1]?.textContent.trim() || '';
    titleDiv.appendChild(cardHeading);
    cardContent.appendChild(titleDiv);

    // Create description div from third cell
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