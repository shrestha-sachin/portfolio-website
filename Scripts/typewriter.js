document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("typewriter");
    const titles = [
        "Software Engineer",
        "Full Stack Developer",
        "Tech Enthusiast",
        "Problem Solver",
        "Web Developer",
        "UI/UX Designer",
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isWaiting = false;

    function typeWriter() {
        if (isWaiting) return;

        const currentTitle = titles[currentIndex];

        // Type the current title
        if (charIndex < currentTitle.length) {
        element.textContent = currentTitle.substring(
            0,
            charIndex + 1
        );
        charIndex++;
        setTimeout(typeWriter, 100); // Typing speed
        return;
        }

        // When title is complete
        isWaiting = true;
        setTimeout(() => {
        isWaiting = false;
        currentIndex = (currentIndex + 1) % titles.length;
        charIndex = 0;
        typeWriter();
        }, 2000); // Pause between titles
    }

    // Start the effect
    typeWriter();
    });