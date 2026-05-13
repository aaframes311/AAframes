/* ── AA Frames | script.js ── */
'use strict';

// ─── NAVBAR SCROLL ───────────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
}, { passive: true });

// ─── ACTIVE NAV LINK ON SCROLL ────────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ─── MOBILE HAMBURGER ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksContainer.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen.toString());
});

// Close mobile menu when a nav link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── INTERSECTION OBSERVER — REVEAL ON SCROLL ─────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// ─── CONTACT FORM → WHATSAPP ──────────────────────────────
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name     = contactForm.querySelector('#name').value.trim();
  const phone    = contactForm.querySelector('#phone').value.trim();
  const occasion = contactForm.querySelector('#occasion').value;
  const message  = contactForm.querySelector('#message').value.trim();

  if (!name || !phone || !occasion || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const text = encodeURIComponent(
    `Hello AA Frames! 👋\n\n` +
    `*Name:* ${name}\n` +
    `*Contact:* ${phone}\n` +
    `*Occasion:* ${occasion}\n` +
    `*Message:* ${message}\n\n` +
    `_Sent from aaframes.in_`
  );

  window.open(`https://wa.me/919605221947?text=${text}`, '_blank');
});

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── STAGGERED CARD REVEAL ────────────────────────────────
const serviceCards = document.querySelectorAll('.service-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
  card.classList.add('reveal');
  cardObserver.observe(card);
});

// ─── PORTFOLIO ITEM HOVER TILT (subtle) ───────────────────
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    item.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// ─── PORTFOLIO GALLERY MODAL ──────────────────────────────
const portraitTrigger = document.getElementById('portrait-gallery-trigger');
const galleryModal = document.getElementById('gallery-modal');
const closeGalleryBtn = document.getElementById('close-gallery');
const galleryContent = document.getElementById('gallery-content');

const portraitImages = [
  'Our Work/Portrait/IMG_9036.JPG.jpeg',
  'Our Work/Portrait/IMG_9065.JPG.jpeg',
  'Our Work/Portrait/IMG_9072.JPG.jpeg',
  'Our Work/Portrait/IMG_9563.JPG.jpeg',
  'Our Work/Portrait/IMG_9564.JPG.jpeg'
];

if (portraitTrigger) {
  portraitTrigger.addEventListener('click', () => {
    // Clear old images
    galleryContent.innerHTML = '';
    
    // Inject images
    portraitImages.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Portrait ${idx + 1}`;
      img.style.animationDelay = `${idx * 0.15}s`;
      galleryContent.appendChild(img);
    });

    // Show modal and disable body scroll
    galleryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeGallery() {
  galleryModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (closeGalleryBtn) {
  closeGalleryBtn.addEventListener('click', closeGallery);
}

// Close on clicking outside the images
if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });

  // Enable horizontal scrolling with mouse wheel
  galleryModal.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      galleryContent.scrollLeft += e.deltaY;
    }
  });
}

// ─── INIT ─────────────────────────────────────────────────
updateActiveNav();
