/* ============================================================
   AVALUX — contact.js
   Handles: form validation, enquiry tabs, file drag-drop,
            office status, FAQ accordion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Office Open / Closed Status ────────────────────────── */
  (function checkOfficeStatus() {
    const dot  = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (!dot || !text) return;

    // UAE time = UTC+4
    const now    = new Date();
    const uaeHour = (now.getUTCHours() + 4) % 24;
    const uaeDay  = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dubai' })).getDay(); // 0=Sun, 6=Sat
    const uaeMin  = now.getUTCMinutes();
    const totalMin = uaeHour * 60 + uaeMin;

    let isOpen = false;
    if (uaeDay >= 1 && uaeDay <= 5) {
      // Mon–Fri 8:00–18:00
      isOpen = totalMin >= 480 && totalMin < 1080;
    } else if (uaeDay === 6) {
      // Sat 9:00–14:00
      isOpen = totalMin >= 540 && totalMin < 840;
    }

    dot.classList.add(isOpen ? 'open' : 'closed');
    text.textContent = isOpen ? 'Currently Open' : 'Currently Closed';
  })();


  /* ── Enquiry Type Tabs ───────────────────────────────────── */
  const tabs      = document.querySelectorAll('.enquiry-tab');
  const typeInput = document.getElementById('enquiryTypeInput');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('enquiry-tab--active'));
      tab.classList.add('enquiry-tab--active');
      if (typeInput) typeInput.value = tab.dataset.type;
    });
  });


  /* ── File Drag & Drop ────────────────────────────────────── */
  const fileWrap  = document.getElementById('fileInputWrap');
  const fileInput = document.getElementById('attachment');
  const fileLabel = document.getElementById('fileLabel');

  if (fileWrap && fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const name = fileInput.files[0].name;
        const size = (fileInput.files[0].size / 1024).toFixed(0);
        fileLabel.textContent = `${name} (${size} KB)`;
        fileWrap.style.borderColor = 'var(--gold)';
        fileWrap.style.background  = 'var(--gold-glow)';
      }
    });

    fileWrap.addEventListener('dragover', e => {
      e.preventDefault();
      fileWrap.classList.add('drag-over');
    });
    fileWrap.addEventListener('dragleave', () => {
      fileWrap.classList.remove('drag-over');
    });
    fileWrap.addEventListener('drop', e => {
      e.preventDefault();
      fileWrap.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }


  /* ── Form Validation & Submit ────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const submitLabel  = document.getElementById('submitLabel');
  const submitSpinner = document.getElementById('submitSpinner');
  const formSuccess  = document.getElementById('formSuccess');
  const resetBtn     = document.getElementById('resetFormBtn');

  function showError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errorId);
    if (input) { input.classList.add('error'); input.classList.remove('valid'); }
    if (err)   err.textContent = msg;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errorId);
    if (input) { input.classList.remove('error'); input.classList.add('valid'); }
    if (err)   err.textContent = '';
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validateForm() {
    let valid = true;

    const firstName = document.getElementById('firstName');
    const lastName  = document.getElementById('lastName');
    const email     = document.getElementById('email');
    const subject   = document.getElementById('subject');
    const message   = document.getElementById('message');
    const consent   = document.getElementById('consent');

    if (!firstName || firstName.value.trim() === '') {
      showError('firstName', 'firstNameError', 'First name is required.');
      valid = false;
    } else { clearError('firstName', 'firstNameError'); }

    if (!lastName || lastName.value.trim() === '') {
      showError('lastName', 'lastNameError', 'Last name is required.');
      valid = false;
    } else { clearError('lastName', 'lastNameError'); }

    if (!email || !validateEmail(email.value.trim())) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      valid = false;
    } else { clearError('email', 'emailError'); }

    if (!subject || subject.value.trim() === '') {
      showError('subject', 'subjectError', 'Please provide a subject.');
      valid = false;
    } else { clearError('subject', 'subjectError'); }

    if (!message || message.value.trim().length < 20) {
      showError('message', 'messageError', 'Message must be at least 20 characters.');
      valid = false;
    } else { clearError('message', 'messageError'); }

    if (!consent || !consent.checked) {
      const err = document.getElementById('consentError');
      if (err) err.textContent = 'Please accept to proceed.';
      valid = false;
    } else {
      const err = document.getElementById('consentError');
      if (err) err.textContent = '';
    }

    return valid;
  }

  // Live validation on blur
  ['firstName', 'lastName', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      // Trigger a partial check
      if (el.value.trim() !== '') {
        el.classList.remove('error');
        el.classList.add('valid');
        const errEl = document.getElementById(`${id}Error`);
        if (errEl) errEl.textContent = '';
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // Show spinner
      submitLabel.style.display  = 'none';
      submitSpinner.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Simulate async submission (replace with real fetch/API call)
      setTimeout(() => {
        form.classList.add('hidden');
        setTimeout(() => {
          form.style.display = 'none';
          formSuccess.classList.add('visible');
        }, 300);
      }, 1800);
    });
  }

  // Reset form
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      formSuccess.classList.remove('visible');
      form.style.display = '';
      setTimeout(() => form.classList.remove('hidden'), 20);

      form.reset();
      submitLabel.style.display  = 'inline-flex';
      submitSpinner.style.display = 'none';
      submitBtn.disabled = false;

      // Clear file label
      if (fileLabel) fileLabel.textContent = 'Click to attach a file or drag & drop here';
      if (fileWrap) {
        fileWrap.style.borderColor = '';
        fileWrap.style.background  = '';
      }

      // Clear all validation states
      form.querySelectorAll('input, textarea, select').forEach(el => {
        el.classList.remove('error', 'valid');
      });
      form.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      // Reset tabs
      tabs.forEach((t, i) => {
        t.classList.toggle('enquiry-tab--active', i === 0);
      });
      if (typeInput) typeInput.value = 'General Enquiry';
    });
  }


  /* ── FAQ Accordion ───────────────────────────────────────── */
  const faqItems = document.querySelectorAll('[data-faq]');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer   = item.querySelector('.faq-item__answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all
      faqItems.forEach(i => {
        const q = i.querySelector('.faq-item__question');
        const a = i.querySelector('.faq-item__answer');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });


  /* ── Scroll Reveal (supplement main.js) ─────────────────── */
  const extras = document.querySelectorAll(
    '.contact-info-card, .faq-item, .contact-form-wrap, .contact-aside'
  );
  extras.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 > 0) el.classList.add(`reveal-delay-${i % 4}`);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  extras.forEach(el => obs.observe(el));

});