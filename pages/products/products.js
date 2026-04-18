/* ============================================================
   AVALUX — products.js
   Handles: category filtering, search, sort, view toggle,
            quick-view modal, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Modal Data ──────────────────────────────────────────
     One entry per data-modal value on the product cards.
     img: '#' = placeholder (replace with real path later)
  ──────────────────────────────────────────────────────── */
  const modalData = {

    /* ── ARCHITECTURAL LIGHTING ── */
    'adj-led': {
      cat: 'Architectural Lighting',
      title: 'Adjustable Downlights LED',
      img: '../../images/Adjustable\ Downlights.webp',
      desc: 'High-performance LED adjustable downlights offering precise directional control for accent and task lighting in residential and commercial interiors. Tilt-and-rotate mechanism with multiple trim finish options.',
      specs: [
        ['Power',        '7W – 25W'],
        ['CRI',          '≥ 90Ra'],
        ['Beam Angle',   '15° – 60°'],
        ['Dimmable',     'TRIAC / DALI / 0-10V'],
        ['Finish',       'White, Black, Gold, Chrome'],
      ],
      tags: ['Dimmable', 'CRI 90+', 'LED', 'Residential', 'Commercial']
    },

    'recessed': {
      cat: 'Architectural Lighting',
      title: 'Recessed Adjustable Beam Angle Downlights',
      img: '../../images/Recessed\ Adjustable.webp',
      desc: 'Recessed downlights with adjustable beam angle technology, allowing the lighting scheme to be modified after installation. Ideal for retail, hospitality, and premium residential projects where flexibility is key.',
      specs: [
        ['Power',        '10W – 30W'],
        ['Beam Angle',   'Adjustable 25° – 60°'],
        ['CRI',          '≥ 90Ra'],
        ['IP Rating',    'IP44'],
        ['Dimmable',     'DALI / 0-10V'],
      ],
      tags: ['Beam Adjustable', 'Recessed', 'Dimmable', 'Retail', 'Hospitality']
    },

    'trimless': {
      cat: 'Architectural Lighting',
      title: 'Trimless Downlight',
      img: '../../images/Trimless\ Square\ Downlight.webp',
      desc: 'Plaster-in trimless downlights for a seamless, flush ceiling finish in luxury residential and high-end commercial environments. Anti-glare deep reflector design with high colour rendering.',
      specs: [
        ['Power',        '7W – 20W'],
        ['CRI',          '≥ 92Ra'],
        ['Cut-out',      'Ø70mm – Ø100mm'],
        ['Dimmable',     'DALI / 0-10V'],
        ['Install',      'Plaster-in / Trimless'],
      ],
      tags: ['Plaster-in', 'Trimless', 'CRI 92+', 'Dimmable', 'Luxury']
    },

    /* ── DECORATIVE LIGHTING ── */
    'nordic': {
      cat: 'Decorative Lighting',
      title: 'Nordic Simple',
      img: '../../images/Nordic\ Simple.jpg',
      desc: 'Minimalist Nordic-inspired decorative pendant luminaire, suited to contemporary residential dining areas, cafes, and boutique hospitality spaces. Clean lines with warm, inviting light output.',
      specs: [
        ['Type',         'Pendant'],
        ['Style',        'Nordic / Minimalist'],
        ['Lamp Base',    'E27'],
        ['Cord Length',  'Adjustable up to 150cm'],
        ['Material',     'Metal / Fabric'],
      ],
      tags: ['Pendant', 'Nordic', 'Residential', 'Cafe', 'Hospitality']
    },

    'pendant': {
      cat: 'Decorative Lighting',
      title: 'Pendant Picture',
      img: '../../images/Pendant_Chandelier.jpg',
      desc: 'Designer picture-frame style pendant light providing focused illumination with a striking visual aesthetic. Suited to galleries, living rooms, dining spaces, and feature walls.',
      specs: [
        ['Type',         'Pendant'],
        ['Style',        'Picture Frame / Designer'],
        ['Light Source', 'Integrated LED'],
        ['CCT',          '2700K / 3000K'],
        ['Finish',       'Black, Gold, Brushed Brass'],
      ],
      tags: ['Pendant', 'Designer', 'Feature', 'LED', 'Gallery']
    },

    'chandelier': {
      cat: 'Decorative Lighting',
      title: 'PMMA Acrylic Lampshade LED Chandelier',
      img: '../../images/Acrylic_Lampshade.jpg',
      desc: 'Elegant PMMA acrylic LED chandelier offering diffused, warm illumination with a premium appearance. Designed for luxury residential interiors, hotel lobbies, and statement ceiling installations.',
      specs: [
        ['Type',         'Chandelier'],
        ['Material',     'PMMA Acrylic'],
        ['Light Source', 'Integrated LED'],
        ['CCT',          '3000K (Warm White)'],
        ['Finish',       'Chrome / Gold / Black'],
      ],
      tags: ['Chandelier', 'PMMA', 'LED', 'Luxury', 'Hotel']
    },

    /* ── EXTERNAL LIGHTING ── */
    'bollards': {
      cat: 'External Lighting',
      title: 'Bollards',
      img: '../../images/Bollard.webp',
      desc: 'Architectural LED bollard luminaires for pathways, driveways, landscaped gardens, and outdoor public spaces. Aluminium and stainless steel body with tamper-proof fixings and corrosion-resistant finish.',
      specs: [
        ['Power',        '6W – 18W'],
        ['IP Rating',    'IP66'],
        ['IK Rating',    'IK08'],
        ['Height',       '600mm – 1000mm'],
        ['Material',     'Aluminium / SS316'],
      ],
      tags: ['IP66', 'IK08', 'Outdoor', 'Landscape', 'Pathway']
    },

    'mini-bollards': {
      cat: 'External Lighting',
      title: 'Mini Bollards',
      img: '../../images/Mini_Bollard.webp',
      desc: 'Compact low-level LED mini bollards for garden path edging, step lighting, and decorative outdoor ground-level illumination. Ideal for residential gardens and commercial landscaped areas.',
      specs: [
        ['Power',        '3W – 8W'],
        ['IP Rating',    'IP65'],
        ['Height',       '200mm – 400mm'],
        ['CCT',          '3000K / 4000K'],
        ['Material',     'Aluminium / Stainless Steel'],
      ],
      tags: ['IP65', 'Low-Level', 'Garden', 'Path', 'Residential']
    },

    /* ── HIGH MAST ── */
    'highmast': {
      cat: 'High Mast',
      title: 'High Mast',
      img: '../../images/High_Mast.jpg',
      desc: 'Heavy-duty LED high mast luminaires for ports, airports, sports facilities, highways, and large industrial open spaces. Available with lowering systems and optional remote monitoring and control.',
      specs: [
        ['Power',        '500W – 1200W'],
        ['IP Rating',    'IP66'],
        ['Mast Height',  '20m – 45m'],
        ['Lumens',       '65,000 – 160,000 lm'],
        ['Wind Load',    'Up to 200 km/h'],
      ],
      tags: ['IP66', '500W–1200W', 'Outdoor', 'Port', 'Airport']
    },

    /* ── INDUSTRIAL LIGHTING ── */
    'batten': {
      cat: 'Industrial Lighting',
      title: 'Batten Luminaire',
      img: '../../images/Batten_Light.webp',
      desc: 'Single and twin LED batten luminaires for warehouses, car parks, corridors, and utility spaces. Linkable design with optional microwave motion sensor for energy-efficient operation.',
      specs: [
        ['Power',        '18W – 72W'],
        ['IP Rating',    'IP54 / IP65'],
        ['Length',       '600mm / 1200mm / 1500mm'],
        ['CCT',          '4000K / 6500K'],
        ['Certifications', 'CE, IEC'],
      ],
      tags: ['IP54', 'LED', 'Linkable', 'Commercial', 'Warehouse']
    },

    'floodlight': {
      cat: 'Industrial Lighting',
      title: 'Floodlight',
      img: '../../images/Floodlight.webp',
      desc: 'Heavy-duty LED floodlights for industrial yards, construction sites, and perimeter security lighting. Die-cast aluminium housing with tempered glass diffuser and multiple mounting options.',
      specs: [
        ['Power',        '50W – 1000W'],
        ['IP Rating',    'IP66'],
        ['IK Rating',    'IK10'],
        ['Beam Angle',   '60° / 90° / 120°'],
        ['Certifications', 'CE, RoHS'],
      ],
      tags: ['IP66', 'IK10', 'Outdoor', 'Security', 'Industrial']
    },

    'highbay': {
      cat: 'Industrial Lighting',
      title: 'High Bay',
      img: '../../images/High_Bay.png',
      desc: 'LED high bay luminaires designed for warehouses, factories, and large open spaces. Available in UFO and linear form factors with optional emergency backup and DALI dimming control.',
      specs: [
        ['Power',        '100W – 400W'],
        ['Lumens',       '13,000 – 56,000 lm'],
        ['CRI',          '≥ 80Ra'],
        ['IP Rating',    'IP65'],
        ['CCT',          '4000K / 5000K'],
      ],
      tags: ['IP65', 'LED', 'Industrial', 'Dimmable', 'DALI']
    },

    /* ── INTERNAL LIGHTING ── */
    'led-downlight': {
      cat: 'Internal Lighting',
      title: 'LED Downlight',
      img: '../../images/Downlights.webp',
      desc: 'Versatile recessed LED downlights for general interior illumination across residential, commercial, and retail environments. Available in fixed and adjustable versions with multiple wattages and colour temperatures.',
      specs: [
        ['Power',        '5W – 20W'],
        ['CRI',          '≥ 80Ra'],
        ['Cut-out',      'Ø60mm – Ø145mm'],
        ['CCT',          '2700K / 3000K / 4000K / 6500K'],
        ['Dimmable',     'TRIAC / DALI'],
      ],
      tags: ['Recessed', 'Dimmable', 'LED', 'Residential', 'Commercial']
    },

    'led-panel': {
      cat: 'Internal Lighting',
      title: 'LED Panel Light',
      img: '../../images/Panel_Light.webp',
      desc: 'Slim-profile recessed and surface-mounted LED panel lights providing uniform, glare-free illumination for offices, schools, clinics, and commercial interiors. Edge-lit and back-lit options available.',
      specs: [
        ['Power',        '18W – 72W'],
        ['Size',         '300×300 / 600×600 / 600×1200mm'],
        ['CRI',          '≥ 80Ra'],
        ['IP Rating',    'IP40 / IP44'],
        ['Certifications', 'CE, RoHS'],
      ],
      tags: ['Slim Profile', 'Uniform', 'Office', 'Glare-Free', 'LED']
    },

    'mag-track': {
      cat: 'Internal Lighting',
      title: 'Magnetic Track Light',
      img: '../../images/Magnetic_Track_Light.webp',
      desc: '48V low-voltage magnetic track lighting system with modular snap-in spotlights, flood heads, and linear modules. Magnetic fixture allows tool-free repositioning along the track at any point.',
      specs: [
        ['Voltage',      '48V DC'],
        ['Track Width',  '15mm / 35mm'],
        ['Modules',      'Spot, Flood, Linear, Pendant'],
        ['Dimmable',     'DALI-2 / Bluetooth'],
        ['CRI',          '≥ 90Ra'],
      ],
      tags: ['48V', 'Magnetic', 'Modular', 'DALI-2', 'CRI 90+']
    },

  };

  /* ── Open / Close Modal ──────────────────────────────────── */
  function openModal(key) {
    const d = modalData[key];
    if (!d) return;

    const imgEl = document.getElementById('modalImg');
    // Only set background-image if it's a real URL, not a placeholder
    if (d.img && d.img !== '#') {
      imgEl.style.backgroundImage = `url('${d.img}')`;
    } else {
      imgEl.style.backgroundImage = 'none';
    }

    document.getElementById('modalCat').textContent   = d.cat;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalDesc').textContent  = d.desc;

    document.getElementById('modalSpecs').innerHTML = d.specs
      .map(([k, v]) => `<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`)
      .join('');

    document.getElementById('modalTags').innerHTML = d.tags
      .map(t => `<span>${t}</span>`)
      .join('');

    document.getElementById('modalBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }

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

  /* ── Filtering ───────────────────────────────────────────── */
  let activeCategory = 'all';
  let searchQuery    = '';

  const allCards     = document.querySelectorAll('.prod-card');
  const visibleCount = document.getElementById('visibleCount');
  const noResults    = document.getElementById('noResults');
  const prodGrid     = document.getElementById('prodGrid');

  function applyFilters() {
    let count = 0;
    allCards.forEach((card, i) => {
      const cat  = card.dataset.cat  || '';
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

  /* Top cat-nav buttons */
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

  /* Search input */
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* Clear filters button */
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
      const val   = sortSelect.value;
      const grid  = document.getElementById('prodGrid');
      const cards = [...grid.querySelectorAll('.prod-card:not(.hidden)')];

      cards.sort((a, b) => {
        const na = a.dataset.name || '';
        const nb = b.dataset.name || '';
        if (val === 'az') return na.localeCompare(nb);
        if (val === 'za') return nb.localeCompare(na);
        return 0;
      });

      const hidden = [...grid.querySelectorAll('.prod-card.hidden')];
      cards.forEach(c => grid.appendChild(c));
      hidden.forEach(c => grid.appendChild(c));
    });
  }

  /* ── View Toggle ─────────────────────────────────────────── */
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