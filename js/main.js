// ===== TYPING ANIMATION =====
const roles = [
    'Developer Full Stack',
    'React Developer',
    'Node.js Developer',
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typed-role');

function tick() {
    const current = roles[roleIdx];

    if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(tick, 2200);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    setTimeout(tick, deleting ? 45 : 75);
}

// ===== SCROLL REVEAL =====
function setupReveal() {
    const targets = document.querySelectorAll(
        '.about-grid, .skills-grid, .projects-grid, .contact-list, .contact-intro, .section-title, .section-label'
    );
    targets.forEach(el => el.classList.add('reveal'));

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 60);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(el => obs.observe(el));
}

// ===== ACTIVE NAV =====
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => obs.observe(s));
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    function close() {
        links.classList.remove('open');
        btn.classList.remove('open');
    }

    btn.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// ===== MATRIX RAIN =====
function setupMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chars = '01アイウエカキクサシスタチツテハヒフヘマミムメヤユラリルロン<>{}[]|/\\';
    const fontSize = 13;
    let drops = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        const cols = Math.floor(canvas.width / fontSize);
        drops = Array(cols).fill(0).map(() => Math.random() * -(canvas.height / fontSize));
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.fillStyle = 'rgba(8, 8, 8, 0.07)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // cabeça da coluna — mais brilhante
            ctx.fillStyle = 'rgba(0, 212, 98, 1)';
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);

            // rastro
            ctx.fillStyle = 'rgba(0, 212, 98, 0.45)';
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 1);
            ctx.fillStyle = 'rgba(0, 212, 98, 0.2)';
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize * 2);

            drops[i]++;
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    setInterval(draw, 45);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(tick, 1000);
    setupReveal();
    setupActiveNav();
    setupMobileMenu();
    setupMatrixRain();
});
