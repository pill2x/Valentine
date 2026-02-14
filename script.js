const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const mainGif = document.getElementById('main-gif');
const container = document.querySelector('.container');
const topMessage = document.getElementById('top-message');
const loadingScreen = document.getElementById('loading-screen');
const loadingBtn = document.getElementById('loading-btn');

// Hide Loading Screen
loadingBtn.addEventListener('click', () => {
    loadingScreen.classList.add('hidden');
    // Optional: Play music here if added later to bypass autoplay restrictions?
});

const phrases = [
    'Are you positive? 🤨',
    'Pookie please... 🥺',
    'If you say no, I will be really sad... 😭',
    'Please??? 🥺🙏',
    'Don\'t do this to me...💔',
    'Last chance! 😭'
];

// GIF Mapping 
const gifs = [
    // 1. Are you positive? -> Shocked/Seriously?
    'assets/what-seriously.gif',
    // 2. Pookie please... -> Sad/Depression
    'assets/sad-depression.gif',
    // 3. If you say no... -> Heartbreak (Logical fill)
    'assets/heartbreak-bear.gif',
    // 4. Please??? -> Chubby Tonton (Explicit request)
    'assets/chubby-tonton.gif',
    // 5. Don't do this... -> Running away/Desperate (Logical fill)
    'assets/chubby-tonton-go-away.gif',
    // 6. Last chance! -> Running away (Evasion phase)
    'assets/tonton-friends-tonton.gif'
];

// Preload GIFs
gifs.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Initial State (Begging/Please) - Explicit request
const initialGif = "assets/chubby-tonton-please.gif";
mainGif.src = initialGif;

let phraseIndex = 0;
let yesFontSize = 1.2;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Audio Objects
// Reliable placeholder for "We Don't Talk Anymore" (Sad Piano or similar)
// User can replace this URL with the actual song file if they have it.
const sadAudio = new Audio("https://github.com/hoangsonww/valentine-confession/raw/main/assets/music.mp3");

// Reliable Love Song (I Love You 3000 instrumental commonly used in these repos)
const successAudio = new Audio("audio/Stephen_Sanchez_-_Until_I_Found_You_slowed_(mp3.pm).mp3");

// "No" Button Click Handler
noBtn.addEventListener('click', () => {
    // 1. Evasion Mode Check (Mobile ONLY)
    if (isMobile && noBtn.dataset.evasion === "true") {
        moveNoButton();
        return; // Stop here, don't change text/GIF
    }

    // Play Sad Audio (User requested "We don't talk anymore")
    // Reset success audio if playing
    successAudio.pause();
    successAudio.currentTime = 0;

    // Play Sad Audio
    sadAudio.volume = 0.5;
    sadAudio.play().catch(e => console.log("Audio play blocked:", e));


    // 2. Cycle Phrases & GIFs
    if (phraseIndex < phrases.length) {
        // Update Text
        noBtn.innerText = phrases[phraseIndex];

        // Update GIF
        if (gifs[phraseIndex]) {
            mainGif.src = gifs[phraseIndex];
        }

        // Update "Yes" Button Size (Massive Growth)
        yesFontSize *= 1.4;
        yesBtn.style.fontSize = `${yesFontSize}rem`;
    }

    // 3. Check for "Last Chance" to activate evasion
    if (phraseIndex === phrases.length - 1) {
        noBtn.dataset.evasion = "true";
    }

    phraseIndex++;
});

// Evasion Logic for PC (Hover)
noBtn.addEventListener('mouseover', () => {
    // On PC (not mobile), evasion happens on hover
    if (!isMobile && noBtn.dataset.evasion === "true") {
        moveNoButton();
    }
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
    // Stop Sad Audio
    sadAudio.pause();
    sadAudio.currentTime = 0;

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

    // Change GIF to Couples Game Animation
    // Keeping the classic kissing one for success as it's the peak "Love" moment
    // Can switch to local "tonton-friends-tonton.gif" if user prefers local only, 
    // but the kissing gif is usually the best payoff.
    mainGif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";

    // Play Success Audio ("You are the one I love" / Romantic)
    successAudio.volume = 0.6;
    successAudio.play().catch(e => console.log("Audio play blocked:", e));

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

window.addEventListener('resize', () => {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
});
