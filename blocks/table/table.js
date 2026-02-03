
export default function decorate(block) {
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  rows.forEach((row) => {
    row.classList.add('timetable-row');

    const cells = Array.from(row.children);
    cells.forEach((cell, index) => {
      cell.classList.add(index === 0 ? 'timetable-label' : 'timetable-value');
    });
  });
}
