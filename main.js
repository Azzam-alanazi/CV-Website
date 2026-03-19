// Animate counting numbers
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    // Observe when element enters viewport
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(update);
        observer.disconnect();
      }
    });
    observer.observe(el);
  });
}

// Fade in sections on scroll
function initScrollReveal() {
  const items = document.querySelectorAll('.card, .page-card, .cert-card, .timeline-card, .info-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeUp 0.5s ease ${i * 0.07}s both`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  initScrollReveal();
});
