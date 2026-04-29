// ===== TYPING ANIMATION =====
const roles = [
    'Developer Full Stack',
    'React Developer',
    'Node.js Developer',
    'Automação & N8N',
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
        '.about-grid, .projects-grid, .contact-list, .contact-intro, .section-title, .section-label'
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

    btn.addEventListener('click', () => {
        const open = links.style.display === 'flex';
        links.style.display = open ? 'none' : 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '64px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = 'rgba(8,8,8,0.97)';
        links.style.padding = '20px 40px';
        links.style.borderBottom = '1px solid #1c1c1c';
        links.style.gap = '20px';
        if (open) links.style.display = 'none';
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.style.display = 'none';
        });
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(tick, 1000);
    setupReveal();
    setupActiveNav();
    setupMobileMenu();
});
