export default function decorate(block) {
  const stats = block.querySelectorAll('h4');
  
  stats.forEach((stat) => {
    const text = stat.textContent.trim();
    const parts = text.match(/^(.+?)\s+(.+)$/);
    
    if (parts) {
      const number = parts[1];
      const label = parts[2];
      
      stat.setAttribute('data-number', number);
      stat.textContent = label;
    }
  });
}