const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const mainGif = document.getElementById('main-gif');
const container = document.querySelector('.container');
const topMessage = document.getElementById('top-message');

const phrases = [
    'Are you positive? 🤨',
    'Pookie please... 🥺',
    'If you say no, I will be really sad... 😭',
    'Please??? 🥺🙏',
    'Don\'t do this to me...💔',
    'Last chance! 😭'
];

// GIF Mapping 
// Using a mix of reliable sources. 
// Ideally these should be hosted locally or on a stable CDN.
const gifs = [
    // 1. Confused
    'https://media1.tenor.com/m/_S0eZ_MhLzQAAAAC/mochi-peach.gif',
    // 2. Sad / Pleading
    'https://media1.tenor.com/m/P4s4Y3dJ5sAAAAAC/mochi-cat-cry.gif',
    // 3. Very Sad
    'https://media1.tenor.com/m/bnq4Y3dJ5sAAAAAC/peach-goma-sad.gif',
    // 4. Crying
    'https://media1.tenor.com/m/SpO4Y3dJ5sAAAAAC/peach-cat-cry.gif',
    // 5. Crying Hard
    'https://media1.tenor.com/m/k6R4Y3dJ5sAAAAAC/peach-goma-crying.gif',
    // 6. Desperate
    'https://media1.tenor.com/m/K2s4Y3dJ5sAAAAAC/bear-sad.gif'
];

// Initial State (Smiling/Happy)
const initialGif = "https://media1.tenor.com/m/f1xnRxTRxLAAAAAC/bears-hugging.gif";
mainGif.src = initialGif;

let phraseIndex = 0;
let yesFontSize = 1.2;

// "No" Button Click Handler
noBtn.addEventListener('click', () => {
    // 1. Evasion Mode Check (First!)
    if (noBtn.dataset.evasion === "true") {
        moveNoButton();
        return; // Stop here, don't change text/GIF
    }

    // 2. Cycle Phrases & GIFs
    if (phraseIndex < phrases.length) {
        // Update Text
        noBtn.innerText = phrases[phraseIndex];

        // Update GIF
        if (gifs[phraseIndex]) {
            mainGif.src = gifs[phraseIndex];
        } else {
            // Fallback if index out of bounds
            mainGif.src = gifs[gifs.length - 1];
        }

        // Update "Yes" Button Size (Massive Growth)
        yesFontSize *= 1.4;
        yesBtn.style.fontSize = `${yesFontSize}rem`;
    }

    // 3. Check for "Last Chance" to activate evasion for NEXT click
    // We just displayed phrases[phraseIndex]. If this was the last one, enable evasion.
    if (phraseIndex === phrases.length - 1) {
        noBtn.dataset.evasion = "true";
    }

    phraseIndex++;
});

function moveNoButton() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const newLeft = Math.random() * (viewportWidth - btnWidth - 40) + 20;
    const newTop = Math.random() * (viewportHeight - btnHeight - 40) + 20;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
}

// "Yes" Button Click Handler
yesBtn.addEventListener('click', () => {
    // Show Top Message
    topMessage.classList.add('show');

    // Hide original question
    question.style.display = 'none';

    // Create and insert inner message
    const innerMessage = document.createElement('h2');
    innerMessage.classList.add('success-message');
    innerMessage.innerText = "You just made me the happiest person ever! 💖";

    document.querySelector('.buttons').style.display = 'none';
    container.insertBefore(innerMessage, document.querySelector('.buttons'));

    // Change GIF to Kissing
    mainGif.src = "https://media1.tenor.com/m/gUiu1zyxfzYAAAAC/bear-kiss-bear-kisses.gif";

    // Infinite Confetti
    triggerConfetti();
});

function triggerConfetti() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInOut(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Interval for continuous confetti
    setInterval(function () {
        const particleCount = 50;

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
