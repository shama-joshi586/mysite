export default function decorate(block) {
    block.classList.add('home');
  block.id = 'home'; 
  const cta = block.querySelector('h5');

  if (cta) {
    cta.addEventListener('click', () => {
      window.location.href = '/about'; 
    });
  }
}
