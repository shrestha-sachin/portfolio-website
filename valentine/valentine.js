// Background Hearts Animation
function createHearts() {
    const heartsContainer = document.getElementById('hearts-bg');
    const heartSymbols = ['❤️', '💖', '💘', '💝', '💕'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
}

createHearts();

// Navigation Logic
const screens = {
    nameInput: document.getElementById('name-input'),
    entrance: document.getElementById('entrance'),
    questions: document.getElementById('questions'),
    proposal: document.getElementById('proposal'),
    celebration: document.getElementById('celebration')
};

// Name Input Logic
let valentineName = "Someone";

function submitName() {
    const input = document.getElementById('valentine-name');
    if (input.value.trim() !== "") {
        valentineName = input.value.trim();
        screens.nameInput.classList.remove('active');
        screens.entrance.classList.add('active');

        // Update envelope text optionally
        // document.querySelector('.envelope-letter p').innerText = `For ${valentineName} ❤️`;
    } else {
        input.style.border = "2px solid red";
        setTimeout(() => {
            input.style.border = "2px solid #ffccd5";
        }, 1000);
    }
}

// Envelope Interaction
document.getElementById('open-envelope').addEventListener('click', function () {
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('open');

    setTimeout(() => {
        screens.entrance.classList.remove('active');
        screens.questions.classList.add('active');
    }, 1500);
});

// Questions Logic
const questionsList = [
    "Are you ready for a surprise?",
    "Do you know how much you mean to me?",
    "Can I ask you something special?"
];

let currentQuestionIndex = 0;
const questionText = document.getElementById('question-text');

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsList.length) {
        questionText.style.opacity = 0;
        setTimeout(() => {
            questionText.innerText = questionsList[currentQuestionIndex];
            questionText.style.opacity = 1;
        }, 300);
    } else {
        screens.questions.classList.remove('active');
        screens.proposal.classList.add('active');
    }
}

function handleNo() {
    const noBtn = document.querySelector('#questions .btn-no');
    const texts = ["Are you sure?", "Really?", "Think again!", "Pookie please 🥺"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    noBtn.innerText = randomText;

    // Shake animation
    noBtn.style.animation = "shake 0.5s ease";
    setTimeout(() => {
        noBtn.style.animation = "none";
    }, 500);
}

// Proposal Logic (Running Button)
const noBtnProposal = document.getElementById('no-btn');
const yesBtnProposal = document.getElementById('yes-btn');

function moveButton() {
    const containerRect = document.querySelector('.proposal-box').getBoundingClientRect();
    const btnRect = noBtnProposal.getBoundingClientRect();

    // Calculate new position within the container bounds
    // We want to keep it visible but hard to click

    // Screen dimensions
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtnProposal.style.position = 'fixed'; // Change to fixed to move freely
    noBtnProposal.style.left = randomX + 'px';
    noBtnProposal.style.top = randomY + 'px';

    // Make Yes button grow slightly each time No is attempted
    const currentSize = parseFloat(window.getComputedStyle(yesBtnProposal).fontSize);
    yesBtnProposal.style.fontSize = (currentSize * 1.1) + 'px';
    yesBtnProposal.style.padding = (parseFloat(window.getComputedStyle(yesBtnProposal).paddingTop) * 1.1) + 'px ' + (parseFloat(window.getComputedStyle(yesBtnProposal).paddingRight) * 1.1) + 'px';
}

// Support mobile touch for running button
noBtnProposal.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click
    moveButton();
});

function acceptProposal() {
    screens.proposal.classList.remove('active');
    screens.celebration.classList.add('active');

    // Launch Confetti
    launchConfetti();
    launchConfetti();
    setTimeout(launchConfetti, 500);

    // Send Notification
    // Send Notification via EmailJS (Works on GitHub Pages)
    // You need to replace these placeholders with your actual EmailJS IDs
    // Sign up at https://www.emailjs.com/
    // Launch Confetti
    launchConfetti();
    launchConfetti();
    setTimeout(launchConfetti, 500);
}

function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Add shake keyframes to style
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(styleSheet);
