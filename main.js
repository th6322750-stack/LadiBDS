(() => {
  const viewAll = document.querySelector('.viewall');
  if (!viewAll) return;

  const modal = document.createElement('div');
  modal.className = 'fp-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = `
    <div class="fp-backdrop" data-close></div>
    <div class="fp-panel" role="dialog" aria-modal="true" aria-label="Tất cả mặt bằng theo PDF">
      <div class="fp-head"><h3>MẶT BẰNG & BỘ SƯU TẬP SẢN PHẨM</h3><button class="fp-close" type="button" data-close aria-label="Đóng">×</button></div>
      <div class="fp-tabs">
        <button class="active" data-filter="all">TẤT CẢ</button>
        <button data-filter="cora">CORA</button>
        <button data-filter="slight">S-LIGHT</button>
        <button data-filter="duplex">DUPLEX</button>
        <button data-filter="penthouse">PENTHOUSE</button>
      </div>
      <div class="fp-grid">
        <article class="fp-card" data-type="cora"><div class="fp-img"></div><h4>CORA TOWER · LAYOUT KHỐI ĐẾ</h4><p>Mặt bằng tầng 1 tòa A1 và A2 — PDF trang 27.</p></article>
        <article class="fp-card" data-type="slight"><div class="fp-img"></div><h4>S-LIGHT TOWER · MẶT BẰNG TẦNG 22</h4><p>Mặt bằng hai tòa SL1 và SL2 — PDF trang 39.</p></article>
        <article class="fp-card" data-type="duplex"><div class="fp-img"></div><h4>GỢI Ý LAYOUT DUPLEX</h4><p>Hai phương án layout Duplex — PDF trang 40.</p></article>
        <article class="fp-card" data-type="penthouse"><div class="fp-img"></div><h4>PENTHOUSE · TẦNG 01 95m² / TẦNG 02 74m²</h4><p>Layout Penthouse gợi ý, gia tăng 78% diện tích — PDF trang 42.</p></article>
        <article class="fp-card" data-type="penthouse2"><div class="fp-img"></div><h4>PENTHOUSE · BỘ SƯU TẬP DIỆN TÍCH</h4><p>74m² / 55m² / 66m² / 60m² và các phương án 100% — PDF trang 43.</p></article>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const open = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  viewAll.addEventListener('click', open);
  viewAll.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  modal.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    modal.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b === btn));
    modal.querySelectorAll('.fp-card').forEach(card => {
      const t = card.dataset.type;
      card.style.display = filter === 'all' || t === filter || (filter === 'penthouse' && t === 'penthouse2') ? '' : 'none';
    });
  }));

  document.querySelectorAll('.cta').forEach(btn => btn.addEventListener('click', () => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})));
})();
