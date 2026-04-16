/* ============================================================
   AVALUX — products.js
   Handles: category filtering, search, sort, view toggle,
            quick-view modal, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Data ────────────────────────────────────────────────
     Quick-view modal content keyed by data-modal value
  ──────────────────────────────────────────────────────── */
  const modalData = {
    mcb: {
      cat: 'Electrical Distribution',
      title: 'MCBs & MCCBs',
      img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
      desc: 'Miniature and moulded case circuit breakers for residential, commercial, and industrial panel boards. Available in 1P, 2P, 3P and 4P configurations with breaking capacities from 6kA to 85kA.',
      specs: [['Standard', 'IEC 60898-1 / IEC 60947-2'], ['Breaking Capacity', '6kA – 85kA'], ['Poles', '1P, 2P, 3P, 4P'], ['Tripping Class', 'B, C, D'], ['Certifications', 'CE, IEC']],
      tags: ['IEC Certified', 'CE', 'Residential', 'Commercial', 'Industrial']
    },
    db: {
      cat: 'Electrical Distribution',
      title: 'Distribution Boards',
      img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80',
      desc: 'Surface and flush-mounted distribution boards in steel and GRP enclosures. Suitable for commercial and industrial load management with DIN rail mounting and busbar systems.',
      specs: [['Type', 'Surface / Flush Mounted'], ['Material', 'Steel, GRP'], ['Ways', '4 – 48 Ways'], ['Protection', 'IP40 – IP65'], ['Certifications', 'IEC 61439']],
      tags: ['IEC', 'Commercial', 'Industrial', 'Steel', 'GRP']
    },
    spd: {
      cat: 'Electrical Distribution',
      title: 'Surge Protection Devices',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      desc: 'Type 1, 2, and 3 surge protection devices for protection of sensitive equipment against transient voltage surges caused by lightning and switching.',
      specs: [['Type', 'Type 1 / Type 2 / Type 3'], ['Standard', 'IEC 61643-11'], ['Uc', 'Up to 440V AC'], ['Iimp', 'Up to 50kA'], ['Certifications', 'CE, IEC']],
      tags: ['CE', 'IEC 61643', 'Residential', 'Commercial']
    },
    highbay: {
      cat: 'Industrial Lighting',
      title: 'High Bay Fixtures',
      img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
      desc: 'LED high bay luminaires designed for warehouses, factories, and large open spaces. Available in UFO and linear form factors with optional emergency backup and DALI dimming.',
      specs: [['Power', '100W – 400W'], ['Lumens', '13,000 – 56,000 lm'], ['CRI', '≥ 80Ra'], ['IP Rating', 'IP65'], ['CCT', '4000K / 5000K']],
      tags: ['IP65', 'LED', 'Industrial', 'Dimmable', 'DALI']
    },
    flood: {
      cat: 'Industrial Lighting',
      title: 'Floodlights',
      img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80',
      desc: 'Heavy-duty LED floodlights for industrial yards, construction sites, and perimeter security. Die-cast aluminium housing with tempered glass diffuser.',
      specs: [['Power', '50W – 1000W'], ['IP Rating', 'IP66'], ['IK Rating', 'IK10'], ['Beam Angle', '60° / 90° / 120°'], ['Certifications', 'CE, RoHS']],
      tags: ['IP66', 'IK10', 'Outdoor', 'Security', 'Industrial']
    },
    batten: {
      cat: 'Industrial Lighting',
      title: 'Batten Luminaires',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      desc: 'Single and twin LED batten lights for car parks, warehouses, corridors, and utility spaces. Linkable design with microwave sensor options available.',
      specs: [['Power', '18W – 72W'], ['IP Rating', 'IP54 / IP65'], ['Length', '600mm / 1200mm / 1500mm'], ['CCT', '4000K / 6500K'], ['Certifications', 'CE, IEC']],
      tags: ['IP54', 'LED', 'Commercial', 'Linkable']
    },
    adj: {
      cat: 'Architectural Lighting',
      title: 'Adjustable Downlights',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      desc: 'Tilt-and-rotate LED downlights for accent and task lighting in retail, hospitality, and residential interiors. Available in round and square trim options with multiple finish colours.',
      specs: [['Power', '7W – 25W'], ['CRI', '≥ 90Ra'], ['Beam Angle', '15° – 60°'], ['Dimmable', 'TRIAC / DALI / 0-10V'], ['Finish', 'White, Black, Gold, Chrome']],
      tags: ['Dimmable', 'CRI 90+', 'Commercial', 'Retail', 'Hospitality']
    },
    trim: {
      cat: 'Architectural Lighting',
      title: 'Trimless Downlights',
      img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      desc: 'Plaster-in trimless downlights for a seamless ceiling finish in luxury residential and premium commercial projects. Anti-glare deep reflector design.',
      specs: [['Power', '7W – 20W'], ['CRI', '≥ 92Ra'], ['Cut-out', 'Ø70mm – Ø100mm'], ['Dimmable', 'DALI / 0-10V'], ['Install', 'Plaster-in / Trimless']],
      tags: ['Dimmable', 'Plaster-in', 'Residential', 'Luxury', 'CRI 92+']
    },
    track: {
      cat: 'Architectural Lighting',
      title: 'Magnetic Track Lights',
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      desc: '48V low-voltage magnetic track systems with slim-profile spotlights, flood heads, and linear modules. Magnetic snap-in fitting for tool-free repositioning.',
      specs: [['Voltage', '48V DC'], ['Track Width', '15mm / 35mm'], ['Modules', 'Spot, Flood, Linear, Pendant'], ['Dimmable', 'DALI-2 / Bluetooth'], ['CRI', '≥ 90Ra']],
      tags: ['48V', 'Dimmable', 'Modular', 'Magnetic', 'DALI-2']
    },
    bollard: {
      cat: 'External Lighting',
      title: 'Bollard Lights',
      img: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80',
      desc: 'Architectural LED bollards for pathways, driveways, parks, and landscaped outdoor areas. Aluminium and stainless steel body with tamper-proof fixings.',
      specs: [['Power', '6W – 18W'], ['IP Rating', 'IP66'], ['IK Rating', 'IK08'], ['Height', '600mm – 1000mm'], ['Material', 'Aluminium / SS316']],
      tags: ['IP66', 'IK08', 'Outdoor', 'Landscape', 'Pathway']
    },
    mast: {
      cat: 'External Lighting',
      title: 'High Mast Lights',
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      desc: 'High mast LED luminaires for ports, airports, highways, sports facilities, and large open areas. Available with lowering systems and remote monitoring.',
      specs: [['Power', '500W – 1200W'], ['IP Rating', 'IP66'], ['Mast Height', '20m – 45m'], ['Lumens', '65,000 – 160,000 lm'], ['Wind Load', 'Up to 200 km/h']],
      tags: ['IP66', '500W–1200W', 'Outdoor', 'Port', 'Airport']
    },
    pole: {
      cat: 'External Lighting',
      title: 'Street & Pole Lights',
      img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      desc: 'LED street and pole-mounted luminaires for roads, car parks, and urban public lighting. Asymmetric optics for uniform road illumination with optional DALI and smart controls.',
      specs: [['Power', '30W – 200W'], ['IP Rating', 'IP65'], ['Control', 'DALI / NEMA / Standalone'], ['CCT', '3000K / 4000K'], ['Certifications', 'CE, IEC 62722']],
      tags: ['IP65', 'DALI', 'Street', 'Smart', 'Urban']
    },
    haz: {
      cat: 'Oil & Gas',
      title: 'Hazardous Area Fixtures',
      img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
      desc: 'ATEX and IECEx certified luminaires for Zone 1 and Zone 2 classified hazardous environments. Suitable for petrochemical, pharmaceutical, and paint spray applications.',
      specs: [['Zone', 'Zone 1 / Zone 2'], ['Certification', 'ATEX / IECEx'], ['Protection', 'Ex d / Ex e / Ex n'], ['IP Rating', 'IP66 / IP67'], ['Power', '20W – 150W LED']],
      tags: ['ATEX', 'IECEx', 'Zone 1/2', 'Ex d', 'IP66']
    },
    exp: {
      cat: 'Oil & Gas',
      title: 'Explosion-Proof Lights',
      img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
      desc: 'Robust explosion-proof LED floodlights and bulkhead lights rated for offshore and onshore oil & gas platforms. Cast iron and GRP housing options.',
      specs: [['Zone', 'Zone 1 / Zone 2 / Zone 21/22'], ['Certification', 'ATEX Ex d IIB+H2'], ['IP Rating', 'IP68'], ['Housing', 'Cast Iron / GRP'], ['Power', '30W – 200W LED']],
      tags: ['ATEX', 'IP68', 'Offshore', 'Onshore', 'Cast Iron']
    },
    corr: {
      cat: 'Oil & Gas',
      title: 'Corrosion-Resistant Luminaires',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      desc: 'GRP and marine-grade stainless steel housing luminaires for corrosive coastal and chemical plant environments. Salt spray tested to BS EN ISO 9227.',
      specs: [['Housing', 'GRP / SS316L'], ['IP Rating', 'IP66'], ['Salt Spray', 'BS EN ISO 9227'], ['Power', '18W – 80W LED'], ['Certifications', 'CE, ATEX optional']],
      tags: ['GRP', 'IP66', 'Marine', 'SS316', 'Chemical']
    },
    pwr: {
      cat: 'Cable & Wiring',
      title: 'Power Cables',
      img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80',
      desc: 'Low and medium voltage power cables including armoured, XLPE insulated, and flexible types for all installations. Available from 1.5mm² to 400mm² conductor size.',
      specs: [['Voltage', '0.6/1kV to 8.7/15kV'], ['Insulation', 'XLPE / PVC'], ['Armour', 'SWA / AWA / Unarmoured'], ['Sheath', 'PVC / LSZH'], ['Standard', 'IEC 60502']],
      tags: ['IEC 60502', 'LSZH', 'Armoured', 'XLPE', 'LV/MV']
    },
    ctrl: {
      cat: 'Cable & Wiring',
      title: 'Control Cables',
      img: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
      desc: 'Multicore screened and unscreened control cables for instrumentation, automation, and process control systems. Individually screened and overall screened options.',
      specs: [['Cores', '2 – 61 cores'], ['Screening', 'Individual / Overall / None'], ['Insulation', 'PVC / XLPE'], ['Voltage', '300/500V'], ['Standard', 'IEC 60227 / IEC 60502']],
      tags: ['Screened', 'IEC', 'Industrial', 'Automation', 'Instrumentation']
    },
    tray: {
      cat: 'Cable & Wiring',
      title: 'Cable Trays & Ladders',
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      desc: 'Hot-dip galvanised and stainless steel cable trays, ladder racks, and trunking for cable management. Full range of fittings, bends, tees, and supports available.',
      specs: [['Material', 'HDG Steel / SS304 / SS316'], ['Width', '50mm – 600mm'], ['Load Rating', 'Up to 250 kg/m'], ['Finish', 'HDG / Pre-galv / PVC coated'], ['Standard', 'IEC 61537']],
      tags: ['Galvanised', 'SS316', 'Industrial', 'IEC 61537', 'Cable Management']
    }
  };

  /* ── Helper: build modal HTML ────────────────────────────── */
  function openModal(key) {
    const d = modalData[key];
    if (!d) return;

    document.getElementById('modalImg').style.backgroundImage  = `url('${d.img}')`;
    document.getElementById('modalCat').textContent            = d.cat;
    document.getElementById('modalTitle').textContent          = d.title;
    document.getElementById('modalDesc').textContent           = d.desc;

    // Specs
    const specsEl = document.getElementById('modalSpecs');
    specsEl.innerHTML = d.specs.map(([k, v]) =>
      `<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`
    ).join('');

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');

    document.getElementById('modalBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Quick view buttons (card footer + image overlay)
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Filtering Logic ─────────────────────────────────────── */
  let activeCategory = 'all';
  let searchQuery    = '';

  const allCards     = document.querySelectorAll('.prod-card');
  const visibleCount = document.getElementById('visibleCount');
  const noResults    = document.getElementById('noResults');
  const prodGrid     = document.getElementById('prodGrid');

  function applyFilters() {
    let count = 0;
    allCards.forEach((card, i) => {
      const cat  = card.dataset.cat || '';
      const name = (card.dataset.name || '').toLowerCase();
      const body = card.querySelector('.prod-card__body')?.textContent.toLowerCase() || '';

      const catMatch    = activeCategory === 'all' || cat === activeCategory;
      const searchMatch = searchQuery === '' || name.includes(searchQuery) || body.includes(searchQuery);

      if (catMatch && searchMatch) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${(count % 9) * 0.05}s`;
        count++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (visibleCount) visibleCount.textContent = count;
    if (noResults)    noResults.style.display  = count === 0 ? 'block' : 'none';
    if (prodGrid)     prodGrid.style.opacity   = count === 0 ? '0'     : '1';
  }

  /* Category nav buttons (sticky bar) */
  document.querySelectorAll('.cat-nav__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-nav__btn').forEach(b => b.classList.remove('cat-nav__btn--active'));
      btn.classList.add('cat-nav__btn--active');
      activeCategory = btn.dataset.cat;
      syncSidebarCats();
      applyFilters();
    });
  });

  /* Sidebar category buttons */
  document.querySelectorAll('.sidebar-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-cat').forEach(b => b.classList.remove('sidebar-cat--active'));
      btn.classList.add('sidebar-cat--active');
      activeCategory = btn.dataset.cat;
      syncCatNav();
      applyFilters();
    });
  });

  function syncSidebarCats() {
    document.querySelectorAll('.sidebar-cat').forEach(b => {
      b.classList.toggle('sidebar-cat--active', b.dataset.cat === activeCategory);
    });
  }
  function syncCatNav() {
    document.querySelectorAll('.cat-nav__btn').forEach(b => {
      b.classList.toggle('cat-nav__btn--active', b.dataset.cat === activeCategory);
    });
  }

  /* Search */
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* Clear filters */
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery    = '';
      if (searchInput) searchInput.value = '';
      syncSidebarCats();
      syncCatNav();
      applyFilters();
    });
  }

  /* ── Sort ────────────────────────────────────────────────── */
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const val     = sortSelect.value;
      const grid    = document.getElementById('prodGrid');
      const cards   = [...grid.querySelectorAll('.prod-card:not(.hidden)')];

      cards.sort((a, b) => {
        const na = a.dataset.name || '';
        const nb = b.dataset.name || '';
        if (val === 'az') return na.localeCompare(nb);
        if (val === 'za') return nb.localeCompare(na);
        return 0;
      });

      // Re-append in sorted order (hidden cards stay at end)
      const hidden = [...grid.querySelectorAll('.prod-card.hidden')];
      cards.forEach(c => grid.appendChild(c));
      hidden.forEach(c => grid.appendChild(c));
    });
  }

  /* ── View Toggle (grid / list) ───────────────────────────── */
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const grid        = document.getElementById('prodGrid');

  if (gridViewBtn && listViewBtn && grid) {
    gridViewBtn.addEventListener('click', () => {
      grid.classList.remove('list-view');
      gridViewBtn.classList.add('view-btn--active');
      listViewBtn.classList.remove('view-btn--active');
    });
    listViewBtn.addEventListener('click', () => {
      grid.classList.add('list-view');
      listViewBtn.classList.add('view-btn--active');
      gridViewBtn.classList.remove('view-btn--active');
    });
  }

  /* ── Mobile Sidebar Toggle ───────────────────────────────── */
  // Inject a "Filter" button above the toolbar on mobile
  const toolbar = document.querySelector('.products-toolbar');
  if (toolbar && window.innerWidth <= 900) {
    const filterBtn = document.createElement('button');
    filterBtn.className = 'btn btn--outline filter-toggle-btn';
    filterBtn.innerHTML = '<i class="fa fa-sliders-h"></i> Filters';
    filterBtn.style.cssText = 'margin-bottom:16px; display:flex; align-items:center; gap:8px;';
    toolbar.parentElement.insertBefore(filterBtn, toolbar);

    const sidebar = document.getElementById('productsSidebar');
    filterBtn.addEventListener('click', () => {
      if (sidebar) {
        sidebar.classList.toggle('open');
        filterBtn.innerHTML = sidebar.classList.contains('open')
          ? '<i class="fa fa-times"></i> Close Filters'
          : '<i class="fa fa-sliders-h"></i> Filters';
      }
    });
  }

  /* ── Scroll Reveal ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.prod-card, .sidebar-block, .sidebar-cta');
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 > 0) el.classList.add(`reveal-delay-${i % 3}`);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => obs.observe(el));

});