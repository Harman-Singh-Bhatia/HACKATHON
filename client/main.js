/**
 * main.js
 * Controls the interactive background effects and animations
 */

// --- 1. Dynamic Mouse Interactive Floating ---
const wrapper = document.querySelector('.login-wrapper');
const panel = document.querySelector('.login-panel');

// Only apply mouse tracking on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        // Calculate distance from center of the screen
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30; // Rotate Y based on X pos
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30; // Rotate X based on Y pos

        // Apply 3D rotation to inner panel (opposite to cursor for parallax)
        panel.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset when mouse leaves window
    document.addEventListener('mouseleave', () => {
        panel.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// --- 2. Background Stars Generation ---
const starsContainer = document.querySelector('.stars-container');

function createStars() {
    // Generate 150 static stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');

        // Random properties
        const size = Math.random() * 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const opacity = Math.random();

        // Inline styles for performance
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#ffffff';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.opacity = opacity.toString();
        star.style.borderRadius = '50%';

        starsContainer.appendChild(star);
    }
}

// --- 3. Anti-Gravity Floating Particles ---
const particlesContainer = document.querySelector('.particles-container');

function createParticles() {
    // Generate 35 glowing particles
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1; // 1px to 5px

        // Alternate colors
        const color = Math.random() > 0.5 ? 'var(--neon-blue)' : 'var(--neon-purple)';

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        // Add random motion parameters attached to the DOM element
        particle.dataset.speed = (Math.random() * 1 + 0.3).toString(); // Float speed
        particle.dataset.wobble = (Math.random() * Math.PI * 2).toString(); // Initial sine wave pos
        particle.dataset.wobbleSpeed = (Math.random() * 0.05 + 0.01).toString(); // Sine wave speed

        // Initial placement
        resetParticle(particle);

        particlesContainer.appendChild(particle);

        // Start animation loop for this particle
        animateParticle(particle);
    }
}

function resetParticle(particle) {
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${window.innerHeight + 20}px`; // Start below screen
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
}

function animateParticle(particle) {
    let top = parseFloat(particle.style.top);
    let left = parseFloat(particle.style.left);
    let speed = parseFloat(particle.dataset.speed);
    let wobble = parseFloat(particle.dataset.wobble);
    let wobbleSpeed = parseFloat(particle.dataset.wobbleSpeed);

    function step() {
        // Move upward
        top -= speed;

        // Sine wave horizontal wobble for "floating" feel
        wobble += wobbleSpeed;
        const currentLeft = left + Math.sin(wobble) * 20;

        particle.style.top = `${top}px`;
        particle.style.transform = `translateX(${currentLeft - left}px)`;

        // Reset if it floats off top of screen
        if (top < -50) {
            resetParticle(particle);
            top = parseFloat(particle.style.top);
            left = parseFloat(particle.style.left);
        }

        requestAnimationFrame(step); // Continue loop
    }

    requestAnimationFrame(step);
}

// Initialize Backgrounds
createStars();
// createParticles(); // Removed snowfall effect as requested

// --- 4. Form Submit Effects ---
const form = document.getElementById('login-form');
const btn = document.querySelector('.login-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Animate button feedback
    btn.innerHTML = '<span>AUTHENTICATING...</span>';
    btn.style.setProperty('--neon-purple', '#00f0ff');
    btn.style.setProperty('--neon-blue', '#8a2be2');

    // Simulate API request/loading time
    setTimeout(() => {
        // Success state
        btn.innerHTML = '<span>ACCESS GRANTED</span>';
        btn.style.background = '#00ff88';
        btn.style.color = '#000';
        btn.style.boxShadow = '0 0 30px #00ff88';

        // Anti-gravity lift off animation!
        wrapper.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        wrapper.style.transform = 'translateY(-100vh) scale(0.8)';
        wrapper.style.opacity = '0';

        // Simulate authentication and redirect
        setTimeout(() => {
            window.location.href = '/climate-dashboard.html';
        }, 800);
    }, 1500);
});

// Re-generate stars on window resize to prevent empty areas
window.addEventListener('resize', () => {
    starsContainer.innerHTML = ''; // Clear old stars
    createStars(); // Make new ones fitting new dimensions
});

// --- 5. Auth Tabs Toggle ---
(function initAuthTabs() {
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const nameGroup = document.getElementById('name-group');
    const submitBtnSpan = document.querySelector('.login-btn span');

    if (!tabLogin || !tabSignup || !nameGroup || !submitBtnSpan) {
        console.warn('Auth tabs elements not found in the DOM.');
        return;
    }

    tabLogin.addEventListener('click', (e) => {
        e.preventDefault();
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');

        nameGroup.style.display = 'none';
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.removeAttribute('required');

        submitBtnSpan.textContent = 'INITIALIZE';
    });

    tabSignup.addEventListener('click', (e) => {
        e.preventDefault();
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');

        nameGroup.style.display = 'block';
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.setAttribute('required', 'true');

        submitBtnSpan.textContent = 'CREATE ACCOUNT';
    });
})();

// main.js

export async function matchEnergy(payload) {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    const res = await fetch(`${API_BASE}/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    return await res.json();
}