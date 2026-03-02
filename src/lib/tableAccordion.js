// tableAccordion.js
// Non-invasive script that creates a mobile-friendly accordion view for tables
// with class `myTable2`. Runs at load time and on resize (debounced).

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function createAccordionForTable(table) {
  if (!table || table.dataset.fsAccordion === 'true') return;

  const headers = Array.from(table.querySelectorAll('thead th')).map(
    (th) => th.textContent.trim()
  );
  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  const rows = Array.from(tbody.querySelectorAll('tr'));
  const accordion = document.createElement('div');
  accordion.className = 'former-staff-accordion global-table-accordion';

  rows.forEach((row, idx) => {
    const cells = Array.from(row.querySelectorAll('td'));

    // Minimal label: second cell if present, otherwise first
    const labelCell = cells[1] || cells[0];
    const labelHtml = labelCell ? labelCell.innerHTML : `Row ${idx + 1}`;

    const item = document.createElement('div');
    item.className = 'fs-accordion-item';

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'fs-accordion-header';
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `<span class="fs-accordion-label-text">${labelHtml}</span><span class="fs-accordion-arrow">▶</span>`;

    // Build body by pairing header labels with cell values
    const body = document.createElement('div');
    body.className = 'fs-accordion-body';

    cells.forEach((cell, cidx) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'fs-accordion-body-row';

      const labelSpan = document.createElement('span');
      labelSpan.className = 'fs-accordion-label';
      // use header name if available, else 'Column N'
      labelSpan.textContent = headers[cidx] || `Column ${cidx + 1}`;

      const valueSpan = document.createElement('span');
      valueSpan.className = 'fs-accordion-value';
      valueSpan.innerHTML = cell.innerHTML;

      rowDiv.appendChild(labelSpan);
      rowDiv.appendChild(valueSpan);
      body.appendChild(rowDiv);
    });

    header.addEventListener('click', () => {
      const open = header.getAttribute('aria-expanded') === 'true';
      // close any other open items within this accordion
      Array.from(accordion.querySelectorAll('.fs-accordion-header')).forEach(
        (h) => {
          h.setAttribute('aria-expanded', 'false');
          h.querySelector('.fs-accordion-arrow')?.classList.remove('open');
        }
      );
      Array.from(accordion.querySelectorAll('.fs-accordion-body')).forEach(
        (b) => (b.style.display = 'none')
      );

      if (!open) {
        header.setAttribute('aria-expanded', 'true');
        header.querySelector('.fs-accordion-arrow')?.classList.add('open');
        body.style.display = 'block';
      } else {
        header.setAttribute('aria-expanded', 'false');
        header.querySelector('.fs-accordion-arrow')?.classList.remove('open');
        body.style.display = 'none';
      }
    });

    // default hide body
    body.style.display = 'none';

    item.appendChild(header);
    item.appendChild(body);
    accordion.appendChild(item);
  });

  // Insert accordion after table
  table.parentNode.insertBefore(accordion, table.nextSibling);
  table.dataset.fsAccordion = 'true';
}

function removeAccordionForTable(table) {
  if (!table) return;
  const accordion = table.parentNode.querySelector('.global-table-accordion');
  if (accordion) accordion.remove();
  delete table.dataset.fsAccordion;
}

function processAllTables() {
  const isMobile = window.innerWidth <= 767;
  const tables = Array.from(document.querySelectorAll('table.myTable2'));
  tables.forEach((table) => {
    if (isMobile) {
      // hide original table via CSS (CSS file will handle), insert accordion
      createAccordionForTable(table);
    } else {
      // remove any created accordion
      removeAccordionForTable(table);
    }
  });
}

// run on DOM ready and on resize
const debounced = debounce(processAllTables, 120);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    processAllTables();
  });
} else {
  processAllTables();
}
window.addEventListener('resize', debounced);

// MutationObserver: re-run processing when DOM changes (tabs show/hide, dynamic content)
// This fixes cases where accordions are not created or hidden when user switches tabs without a resize.
try {
  const observer = new MutationObserver(debounced);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  // optional: keep reference for debugging
  // window.__tableAccordionObserver = observer;
} catch {
  // ignore if MutationObserver not supported
}

// export for testing if needed
export { processAllTables };
