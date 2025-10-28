// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.aggregator-container');
  const rows = Array.from(document.querySelectorAll('.comparison-table .table-row'));

  if (!container || rows.length === 0) return;

  rows.forEach(row => {
    row.setAttribute('tabindex', '0');

    function activateThis() {
      const already = row.classList.contains('active-row');
      rows.forEach(r => r.classList.remove('active-row'));
      if (already) {
        container.classList.remove('active');
      } else {
        row.classList.add('active-row');
        container.classList.add('active');
      }
    }

    row.addEventListener('click', activateThis);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateThis();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.comparison-table') && !e.target.closest('.aggregator-header')) {
      container.classList.remove('active');
      rows.forEach(r => r.classList.remove('active-row'));
    }
  });
});