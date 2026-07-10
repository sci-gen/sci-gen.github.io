(() => {
  const root = document.querySelector('[data-catalog]');
  if (!root) return;

  const buttons = [...root.querySelectorAll('[data-category-filter]')];
  const cards = [...root.querySelectorAll('[data-catalog-category]')];
  const count = root.querySelector('[data-catalog-count]');
  const empty = root.querySelector('[data-catalog-empty]');
  const supported = new Set(buttons.map((button) => button.dataset.categoryFilter));

  function apply(category, updateUrl = true) {
    const active = supported.has(category) ? category : 'all';
    let visible = 0;
    cards.forEach((card) => {
      const show = active === 'all' || card.dataset.catalogCategory === active;
      card.hidden = !show;
      if (show) visible += 1;
    });
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === active));
    });
    if (count) count.textContent = `${visible}本を表示`;
    if (empty) empty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (active === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', active);
      history.replaceState({}, '', url);
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.categoryFilter)));
  apply(new URLSearchParams(window.location.search).get('category') || 'all', false);
})();
