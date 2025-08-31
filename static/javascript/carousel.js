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
    dynamicText.style.animation = 'textCarousel 0.1s ease-in-out';

    currentIndex++;
    dynamicText.textContent = textOptions[currentIndex];

    // Stop when we reach "everyone"
    if (currentIndex >= textOptions.length - 1) {
        clearInterval(intervalId);
    }
}

intervalId = setInterval(switchText, 150);

// Animation for shows section
window.addEventListener('DOMContentLoaded', function() {
    var showsSection = document.querySelector('.shows-section');
    var showsBg = document.querySelector('.shows-section-bg');
    var showsCards = document.querySelectorAll('.shows-card');
    if (!showsSection || !showsBg || !showsCards.length) return;
    var blurTimeout = null;
    function setCardsVisible(visible) {
        showsCards.forEach(function(card) {
            if (visible) {
                card.style.opacity = '';
                card.style.transform = '';
            } else {
                card.style.opacity = 0;
                card.style.transform = 'translateY(40px) scale(0.98)';
            }
        });
    }
    function onScroll() {
        var rect = showsSection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
            showsSection.classList.add('active');
            showsBg.classList.remove('blur');
            setCardsVisible(true);
            if (blurTimeout) clearTimeout(blurTimeout);
            blurTimeout = setTimeout(function() {
                showsBg.classList.add('blur');
            }, 1200); // Wait for card fade-in before blurring
        } else {
            showsSection.classList.remove('active');
            showsBg.classList.remove('blur');
            setCardsVisible(false);
            if (blurTimeout) clearTimeout(blurTimeout);
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Toggle to show the 'no shows planned' card
    setNoShowsMode(false);
});
