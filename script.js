document.addEventListener('DOMContentLoaded', function() {
  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Mobile nav toggle (if needed in future)
  // Currently nav is always visible with just 3 links
});