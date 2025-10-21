/* js/app.js */
document.addEventListener('DOMContentLoaded', () => {
  // === 1. HIGHLIGHT ACTIVE PAGE ===
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  const map = { 'index.html':'home', 'about.html':'about', 'contact.html':'contact' };
  const page = map[currentPath] || 'home';
  
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // === 2. PROFILE CARD TIME ===
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  if (timeEl) {
    const updateTime = () => timeEl.textContent = Date.now();
    updateTime();
    setInterval(updateTime, 1000);
  }

  // === 3. CONTACT FORM VALIDATION ===
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('successMessage');
  
  if (form && successEl) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      
      const name = getValue('name');
      const email = getValue('email');
      const subject = getValue('subject');
      const message = getValue('message');
      
      let isValid = true;

      if (!name) { showError('name', 'Full name is required'); isValid = false; }
      if (!email) { showError('email', 'Email is required'); isValid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email'); isValid = false;
      }
      if (!subject) { showError('subject', 'Subject is required'); isValid = false; }
      if (!message) { showError('message', 'Message is required'); isValid = false; }
      else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters'); isValid = false;
      }

      if (isValid) {
        // SHOW SUCCESS WITH ANIMATION
        successEl.classList.remove('show');
        // Force reflow
        void successEl.offsetWidth;
        successEl.classList.add('show');
        
        form.reset();
        
        // HIDE AFTER 5 SECONDS WITH FADE
        setTimeout(() => {
          successEl.classList.remove('show');
        }, 5000);
      }
    });
  }

  function getValue(id) { 
    return document.getElementById(id).value.trim(); 
  }
  
  function showError(field, message) {
    const errorEl = document.getElementById(`error-${field}`);
    const inputEl = document.getElementById(field);
    errorEl.textContent = message;
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.setAttribute('aria-live', 'polite');
  }
  
  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
      el.textContent = '';
      const inputId = el.id.replace('error-', '');
      const input = document.getElementById(inputId);
      if (input) input.setAttribute('aria-invalid', 'false');
    });
  }
});