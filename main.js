document.addEventListener('DOMContentLoaded', () => {
    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    // Initially show first slide but don't rotate
    if (slides.length > 0) slides[0].classList.add('active');

    function startSlideshow() {
        // Start rotation
        slideInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Faster rotation (3s) for the celebration phase
    }

    // "No" Button Evasion & Cute Messages Logic
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    const cuteMessages = [
        "Are you sure?",
        "Really?",
        "Think again!",
        "Last chance!",
        "Surely not?",
        "You might regret this!",
        "Give it another thought!",
        "Are you absolutely certain?",
        "This could be a mistake!",
        "Have a heart!",
        "Don't be so cold!",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're breaking my heart ;(",
    ];

    const moveNoButton = () => {
        // Change Text
        const randomMsg = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
        noBtn.innerText = randomMsg;

        // Move Button
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click logic on touch
        moveNoButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    }); // Just in case they manage to click

    // "Yes" Button Logic
    const mainContent = document.getElementById('main-content');
    const photoContainer = document.getElementById('photo-container');
    const finalMsg = document.getElementById('final-msg');
    const audio = document.getElementById('bg-music');

    yesBtn.addEventListener('click', () => {
        // 1. Fade out question and buttons
        mainContent.style.transition = 'opacity 1s';
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.display = 'none';
        }, 1000);

        // 2. Trigger Photo Animation
        photoContainer.style.opacity = '1';

        // Slight delay to allow display change to register before class add for transition
        setTimeout(() => {
            photoContainer.classList.add('merged');
        }, 100);

        // 3. Play Music (if source existed)
        audio.play().catch(e => console.log("Audio play failed (interaction needed or no src)", e));

        // 4. Start Slideshow
        startSlideshow();

        // 5. Start Particle Effects
        startHearts();
    });

    // Particle System
    function startHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // 3-5s
            heart.style.fontSize = Math.random() * 2 + 1 + 'rem';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
