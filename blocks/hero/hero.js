
export default function decorate(block) {
  // The innermost div containing picture + text
  const inner = block.querySelector('div > div');
  if (!inner) return;

  // Wrap text node in a div for proper positioning
  const textNode = Array.from(inner.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
  );

  if (textNode) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('hero-text');
    textWrapper.textContent = textNode.textContent.trim();

    // Remove original text node and append wrapped div
    inner.removeChild(textNode);
    inner.appendChild(textWrapper);
  }

  // Optional: add overlay class to hero
  block.classList.add('hero-with-overlay');
}
