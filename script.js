const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const mainGif = document.getElementById('main-gif');
const container = document.querySelector('.container');
const topMessage = document.getElementById('top-message');
const loadingScreen = document.getElementById('loading-screen');
const loadingBtn = document.getElementById('loading-btn');
const giftBoxContainer = document.getElementById('gift-box-container');

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

const successGifs = [
    // 1. Kissing (The immediate reaction)
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",
    // 2. Gaming together
    "https://media.tenor.com/SIMPL8yvj4wAAAAi/gaming-couple.gif",
    // 3. Eating together
    "https://media.tenor.com/p6XUbfeS6aUAAAAi/mocha-bear-care.gif",
    // 4. Watching Movie/Cinema
    "https://media.tenor.com/SG73806w2xIAAAAi/milk-bear-mocha.gif"
];

// Preload GIFs
gifs.forEach(src => {
    const img = new Image();
    img.src = src;
});
successGifs.forEach(src => {
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
const sadAudio = new Audio("audio/Selena_Gomez_-_Lose_You_To_Love_Me_(mp3.pm).mp3");
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

    // Set Initial Success GIF (Kissing)
    mainGif.src = successGifs[0];

    // Play Success Audio
    successAudio.volume = 0.6;
    successAudio.play().catch(e => console.log("Audio play blocked:", e));

    // Infinite Confetti (Immediate)
    triggerConfetti();

    // SHOW GIFT BOX AFTER 1 Second (Teaser)
    setTimeout(() => {
        giftBoxContainer.classList.remove('hidden');
    }, 1000);
});

// Gift Box Click Handler (Trigger New Flow)
giftBoxContainer.addEventListener('click', () => {
    // 1. Hide the entire Main Container
    container.style.display = 'none'; // Or classList.add('hidden') if defined
    document.getElementById('top-message').style.display = 'none';

    // 2. Show Message Modal
    const messageModal = document.getElementById('message-modal');
    messageModal.classList.remove('hidden');
    // Force reflow
    void messageModal.offsetWidth;
    messageModal.classList.add('show');

    // 3. Wait 10 Seconds, then Show Roadmap
    setTimeout(() => {
        // Fade out modal
        messageModal.classList.remove('show');
        setTimeout(() => {
            messageModal.style.display = 'none';
        }, 8000); // Wait for fade out transition

        // Show Roadmap
        startRoadmapAnimation();

    }, 8000);
});

function startRoadmapAnimation() {
    const roadmapContainer = document.getElementById('roadmap-container');
    roadmapContainer.classList.remove('hidden');
    void roadmapContainer.offsetWidth;
    roadmapContainer.classList.add('show');

    // Animate Walker down the path
    const walker = document.querySelector('.walker');
    setTimeout(() => {
        walker.style.top = '90%'; // Move to bottom
    }, 100);

    // Reveal Milestones sequentially as the walker "passes" them
    // Total duration is roughly 8s (defined in CSS transition)
    const milestones = document.querySelectorAll('.milestone');

    milestones.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, (index + 1) * 1500); // Reveal one every 1.5 seconds approx
    });
}

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
