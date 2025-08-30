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
