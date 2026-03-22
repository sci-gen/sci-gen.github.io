// インタラクティブ要素のためのJavaScript

document.addEventListener('DOMContentLoaded', function() {
  const updateStoreBadges = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const badgeImages = document.querySelectorAll('.store-badge-image');

    badgeImages.forEach((image) => {
      const defaultSrc = image.getAttribute('data-default-src');
      const darkModeSrc = image.getAttribute('data-darkmode-src');
      image.src = isDarkMode ? darkModeSrc : defaultSrc;
    });
  };

  // ナビゲーションのハイライト効果
  const navLinks = document.querySelectorAll('.navigation a, .navigation-links a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.classList.add('nav-hover');
    });
    link.addEventListener('mouseleave', function() {
      this.classList.remove('nav-hover');
    });
  });

  // CTAボタンのホバーエフェクト
  const ctaButtons = document.querySelectorAll('.cta-button, .contact-button');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('cta-hover');
    });
    button.addEventListener('mouseleave', function() {
      this.classList.remove('cta-hover');
    });
  });

  // サービスカードのインタラクティブ効果
  const serviceCards = document.querySelectorAll('.service-card, .project-card, .app-section');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
    });
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
    card.addEventListener('click', function() {
      // カードがクリックされたときの詳細表示トグル
      this.classList.toggle('card-expanded');
    });
  });

  // スクロールアニメーション
  const scrollElements = document.querySelectorAll('.hero-section, .services-section, .portfolio-section, .contact-section');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // 初期ロード時にもアニメーションを適用
  handleScrollAnimation();
  
  // スクロール時のアニメーション
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });

  // ダークモード切り替え機能
  const createDarkModeToggle = () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'ダークモード切り替え';
    
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      updateStoreBadges();
    });
    
    // ローカルストレージからダークモード設定を読み込む
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }

    updateStoreBadges();
    
    document.body.appendChild(darkModeToggle);
  };
  
  createDarkModeToggle();
});
