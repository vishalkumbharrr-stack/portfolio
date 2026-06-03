const paraText = "Hi, I'm Vishal Kumbhar — Full-Stack Developer & AI Enthusiast. I build scalable web applications and intelligent automation tools.";
const typingSpeed = 40;
let charIndex = 0;

function typeParagraph() {
    const textElement = document.getElementById("typing-para");
    if (textElement && charIndex < paraText.length) {
        textElement.innerHTML += paraText.charAt(charIndex);
        charIndex++;
        setTimeout(typeParagraph, typingSpeed);
    }
}

window.addEventListener('scroll', () => {
    const topBar = document.getElementById('topBar');
    
    if (window.scrollY > 20) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});

function toggleContactMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const menu = document.getElementById('contactMenu');
    const chevron = document.querySelector('.contact-trigger .drop-icon');
    
    if (window.innerWidth <= 768) {
        if (!menu.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    const isShowing = menu.classList.contains('show');
    
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    if(chevron) document.querySelectorAll('.drop-icon').forEach(icon => icon.style.transform = '');
    
    if (!isShowing) {
        menu.classList.add('show');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.contact-dropdown');
    const menu = document.getElementById('contactMenu');
    const chevron = document.querySelector('.contact-trigger .drop-icon');
    
    if (menu && dropdown && !dropdown.contains(event.target)) {
        menu.classList.remove('show');
        if (chevron) chevron.style.transform = '';
        
        if (window.innerWidth <= 768) {
            document.body.style.overflow = '';
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menu = document.getElementById('contactMenu');
        const chevron = document.querySelector('.contact-trigger .drop-icon');
        if (menu) {
            menu.classList.remove('show');
            document.body.style.overflow = '';
        }
        if (chevron) chevron.style.transform = '';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    
    setTimeout(typeParagraph, 600);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    if (entry.target.classList.contains('skill-card')) {
                        entry.target.classList.add('show-card');
                    }
                    if (entry.target.classList.contains('project-item')) {
                        entry.target.classList.add('show-project');
                    }
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateItems = document.querySelectorAll('.skill-card, .project-item');
    animateItems.forEach(item => observer.observe(item));
});
