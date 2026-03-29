document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll('.hero-section, .portfolio-section, .contact-section');

  if (scrollElements.length === 0) {
    return;
  }

  const revealVisibleElements = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    scrollElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const isVisible = elementTop <= viewportHeight * 0.8;

      element.classList.toggle('scrolled', isVisible);
    });
  };

  revealVisibleElements();
  window.addEventListener('scroll', revealVisibleElements, { passive: true });
});
