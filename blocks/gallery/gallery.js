export default function decorate(block) {
  block.classList.add('gallery');

  const children = [...block.children];

  // First div = title
  const title = children[0];
  if (title) {
    title.classList.add('gallery-title');
  }
}