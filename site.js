(function () {
  const root = document.documentElement;
  const button = document.querySelector('.theme');
  button.addEventListener('click', function () {
    if (root.dataset.theme === 'dark') delete root.dataset.theme;
    else root.dataset.theme = 'dark';
    try {
      localStorage.setItem(
        'casa-em-dia-theme',
        root.dataset.theme === 'dark' ? 'dark' : 'light',
      );
    } catch (_error) {}
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  elements.forEach((element) => observer.observe(element));
})();
