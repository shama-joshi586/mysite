export default function decorate(block) {
  const cta = block.querySelector('h5');

  if (cta) {
    cta.addEventListener('click', () => {
      window.location.href = '/about'; 
    });
  }
}
