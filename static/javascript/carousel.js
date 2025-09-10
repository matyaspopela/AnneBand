// Dynamic text carousel for hero title
const dynamicText = document.getElementById('dynamic-text');
const textOptions = [
    'you', 'us', 'people', 'winners', 'all times', 'rebels', 'dreamers',
    'fighters', 'legends', 'youth', 'freedom', 'music', 'love', 'passion', 'energy',
    'power', 'glory', 'fans', 'crowds', 'stages', 'nights', 'moments', 'memories',
    'life', 'souls', 'hearts', 'minds', 'generations', 'eternity', 'revolution', 'change', 'everyone.'
];
let currentIndex = 0;
let intervalId;

function switchText() {
    dynamicText.style.animation = 'none';
    dynamicText.offsetHeight; // Trigger reflow
    dynamicText.style.animation = 'textCarousel 0.14s ease-in-out';

    currentIndex++;
    dynamicText.textContent = textOptions[currentIndex];

    // Stop when we reach "everyone"
    if (currentIndex >= textOptions.length - 1) {
        clearInterval(intervalId);
    }
}

intervalId = setInterval(switchText, 150);

// Animation for shows section - New unified card design
window.addEventListener('DOMContentLoaded', function() {
    var showsSection = document.querySelector('.shows-section');
    var showsBgImage = document.querySelector('.shows-bg-image');
    var unifiedCard = document.querySelector('.shows-card-unified');
    
    if (!showsSection || !showsBgImage || !unifiedCard) return;
    
    function onScroll() {
        var rect = showsSection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Trigger animation when section is 70% visible
        if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            showsSection.classList.add('active');
            unifiedCard.classList.add('visible');
        } else {
            showsSection.classList.remove('active');
            unifiedCard.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
    
    // Initialize with shows mode (false = show mode, true = no shows mode)
    setNoShowsMode(false);
});

// Fade-in animation for sections and elements
function animateOnScroll() {
    var elements = document.querySelectorAll('section, .about-container, .album-promotion, .site-footer, .hero-title-up, .hero-title-up span, .album-cover');
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    elements.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);
