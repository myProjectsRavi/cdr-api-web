// Zero Trust API - Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Code Tabs
    const tabs = document.querySelectorAll('.code-tab');
    const examples = document.querySelectorAll('.code-example');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const lang = this.dataset.lang;

            // Remove active class from all tabs and examples
            tabs.forEach(t => t.classList.remove('active'));
            examples.forEach(e => e.classList.remove('active'));

            // Add active class to clicked tab and corresponding example
            this.classList.add('active');
            document.getElementById(lang).classList.add('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.threat-card, .feature-card, .pricing-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Copy code function
function copyCode(lang) {
    const codeBlock = document.querySelector(`#${lang} pre code`);
    const text = codeBlock.innerText;

    navigator.clipboard.writeText(text).then(() => {
        // Find the button and show feedback
        const btn = document.querySelector(`#${lang} .copy-btn`);
        const originalText = btn.innerText;
        btn.innerText = '✅ Copied!';
        btn.style.background = 'rgba(16, 185, 129, 0.3)';
        btn.style.color = '#10b981';

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
