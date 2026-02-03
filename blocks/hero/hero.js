export default function decorate(block) {
  const heading = block.querySelector('h1');
  const cta = block.querySelector('a');

  if (heading) {
    heading.classList.add('hero-heading');
  }

  if (cta) {
    cta.addEventListener('click', () => {
      console.log('Hero CTA clicked');
    });
  }
}
