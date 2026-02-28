// =========================================
// टायपिंग ॲनिमेशन सेटअप (Typing Animation)
// =========================================

// हे text टाईप होईल (The text that will be typed)
const paraText = "Hi, I'm Vishal Kumbhar — Full-Stack Developer & AI Enthusiast. I build scalable web applications and intelligent automation tools.";
const typingSpeed = 40;  // किती वेगाने टाईप होईल (Typing speed)
let charIndex = 0;        // कोणत्या अक्षरावर आहोत (Current character index)

// टाईपिंग करणारे फंक्शन (Function that types)
function typeParagraph() {
    const textElement = document.getElementById("typing-para");  // जिथे टाईप करायचं ते element
    if (textElement && charIndex < paraText.length) {
        textElement.innerHTML += paraText.charAt(charIndex);    // एक एक अक्षर जोडा
        charIndex++;
        setTimeout(typeParagraph, typingSpeed);                  // पुढच्या अक्षरासाठी थोडी वाट पहा
    }
}

// =========================================
// हेडर स्क्रोल इफेक्ट (Header changes on scroll)
// =========================================
window.addEventListener('scroll', () => {
    const topBar = document.getElementById('topBar');  // header शोधा
    
    // 20px पेक्षा जास्त scroll केलं तर class लावा
    if (window.scrollY > 20) {
        topBar.classList.add('scrolled');     // सावली येईल
    } else {
        topBar.classList.remove('scrolled');  // सावली हटवा
    }
});

// =========================================
// कॉन्टॅक्ट ड्रॉपडाउन लॉजिक (Contact dropdown)
// =========================================

// ड्रॉपडाउन दाखवा/लपवा (Show/Hide dropdown)
function toggleContactMenu(event) {
    event.preventDefault();      // पेज रीलोड होण्यापासून थांबवा
    event.stopPropagation();     // इतर ठिकाणी क्लिक व्हायला थांबवा
    
    const menu = document.getElementById('contactMenu');  // ड्रॉपडाउन मेनू
    const chevron = document.querySelector('.contact-trigger .drop-icon');  // खाली बाण
    
    // मोबाइल असेल तर मागचा स्क्रोल बंद करा
    if (window.innerWidth <= 768) {
        if (!menu.classList.contains('show')) {
            document.body.style.overflow = 'hidden';  // स्क्रोल बंद
        } else {
            document.body.style.overflow = '';        // स्क्रोल सुरू
        }
    }
    
    // सध्या दिसतोय का ते पहा
    const isShowing = menu.classList.contains('show');
    
    // इतर सगळे ड्रॉपडाउन बंद करा
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    if(chevron) document.querySelectorAll('.drop-icon').forEach(icon => icon.style.transform = '');
    
    // जर दिसत नसेल तर दाखवा
    if (!isShowing) {
        menu.classList.add('show');                    // मेनू दाखवा
        if (chevron) chevron.style.transform = 'rotate(180deg)';  // बाण वर करा
    }
}

// बाहेर क्लिक केल्यावर ड्रॉपडाउन बंद करा
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.contact-dropdown');  // संपूर्ण ड्रॉपडाउन क्षेत्र
    const menu = document.getElementById('contactMenu');
    const chevron = document.querySelector('.contact-trigger .drop-icon');
    
    // जर ड्रॉपडाउनच्या बाहेर क्लिक असेल तर
    if (menu && dropdown && !dropdown.contains(event.target)) {
        menu.classList.remove('show');                 // मेनू लपवा
        if (chevron) chevron.style.transform = '';     // बाण सरळ करा
        
        // मोबाइलवर स्क्रोल सुरू करा
        if (window.innerWidth <= 768) {
            document.body.style.overflow = '';
        }
    }
});

// Escape की दाबल्यावर ड्रॉपडाउन बंद करा
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menu = document.getElementById('contactMenu');
        const chevron = document.querySelector('.contact-trigger .drop-icon');
        if (menu) {
            menu.classList.remove('show');
            document.body.style.overflow = '';         // स्क्रोल सुरू करा
        }
        if (chevron) chevron.style.transform = '';
    }
});

// =========================================
// स्क्रोल ॲनिमेशन (जेव्हा खाली स्क्रोल करतो तेव्हा)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // टायपिंग ॲनिमेशन सुरू करा
    setTimeout(typeParagraph, 600);  // 0.6 सेकंदानंतर सुरू करा
    
    // Intersection Observer सेटअप - हे पाहते की element दिसतोय का
    const observerOptions = {
        threshold: 0.1,                // 10% दिसलं की ट्रिगर करा
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {  // जर element दिसत असेल तर
                // थोड्या अंतराने ॲनिमेशन सुरू करा
                setTimeout(() => {
                    if (entry.target.classList.contains('skill-card')) {
                        entry.target.classList.add('show-card');     // skill card दाखवा
                    }
                    if (entry.target.classList.contains('project-item')) {
                        entry.target.classList.add('show-project');   // project दाखवा
                    }
                }, index * 50);  // प्रत्येकाला 50ms चा फरक
                
                observer.unobserve(entry.target);  // एकदा दाखवलं की पुन्हा पाहू नका
            }
        });
    }, observerOptions);

    // सगळी skill cards आणि projects शोधा
    const animateItems = document.querySelectorAll('.skill-card, .project-item');
    animateItems.forEach(item => observer.observe(item));  // प्रत्येकावर नजर ठेवा
});