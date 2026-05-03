    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    var hamburger   = document.getElementById('hamburger');
    var mobileMenu  = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    var revealEls = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var sections  = document.querySelectorAll('section[id]');
    var navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
    window.addEventListener('scroll', function () {
      var y = window.scrollY + 100;
      var cur = '';
      sections.forEach(function (s) { if (y >= s.offsetTop) cur = s.id; });
      navLinks.forEach(function (a) {
        a.style.color = (a.getAttribute('href') === '#' + cur) ? 'var(--primary)' : '';
      });
    }, { passive: true });

    var form      = document.getElementById('contactForm');
    var submitBtn = document.getElementById('submitBtn');
    var success   = document.getElementById('formSuccess');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('name').value.trim();
      var email   = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')].forEach(function (el) {
          if (!el.value.trim()) el.style.borderColor = '#ef4444';
        });
        return;
      }
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg style="animation:spin .7s linear infinite" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/><path d="M12 3a9 9 0 019 9"/></svg> Sending…';
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        success.classList.add('show');
        form.reset();
        setTimeout(function () { success.classList.remove('show'); }, 6000);
      }, 1400);
    });

    ['name','email','message'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });

    var s = document.createElement('style');
    s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
