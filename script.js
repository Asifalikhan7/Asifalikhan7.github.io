// ===== Document Ready =====
document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // ===== Sticky Header on Scroll =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== Back to Top Button =====
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Typing Animation in Hero Section =====
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const professions = [
            "Web developer",
            "Graphic Designer",
            "Video editor",
            "Accountant",
        ];
        
        let professionIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentProfession = professions[professionIndex];
            
            if (isDeleting) {
                typingText.textContent = currentProfession.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentProfession.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentProfession.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(type, 1500); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                professionIndex++;
                if (professionIndex === professions.length) {
                    professionIndex = 0;
                }
                setTimeout(type, 500); // Pause before typing next word
            } else {
                const typingSpeed = isDeleting ? 70 : 90;
                setTimeout(type, typingSpeed);
            }
        }
        
        // Start typing animation after 0.1 second
        setTimeout(type, 1000);
    }
    
    // ===== Projects Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item'); // updated selector
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                // Show all if 'all' button is clicked
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    // Match the data-category attribute
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // ===== Skill Animation on Scroll =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.parentElement.querySelector('.skill-name span:last-child').textContent;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ===== Testimonials Slider =====
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            testimonials[index].style.display = 'block';
        }
        
        showTestimonial(currentTestimonial);
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // ===== Newsletter Form Submission =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
    
    // ===== Download CV Button =====
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Downloading CV...');
            // window.location.href = 'path/to/your-cv.pdf';
        });
    }
    
    // ===== Current Year in Footer =====
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== Floating Particles Background =====
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        const colors = ['#6e45e2', '#88d3ce', '#ff7e5f'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
    
    // ===== Animate Elements on Scroll =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-item, .project-item, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.service-item, .project-item, .about-image, .about-text').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// ===== Preloader =====
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;
    
    document.body.prepend(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});
// ===== Toggle Chat Box =====
const chatButton = document.getElementById('chat-button');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

chatButton.addEventListener('click', () => chatBox.style.display = 'flex');
closeChat.addEventListener('click', () => chatBox.style.display = 'none');

// ===== All Answers =====
const answers = {
    // Greetings
    "hello": "Hello! 👋 I’m your Freelancer Assistant. How can I help you today? WhatsApp: https://wa.me/923440192535",
    "hi": "Hi there! 😊 I can assist you with Web Development, Graphic Design, Video Editing, and Accounting. WhatsApp: https://wa.me/923440192535",
    "hey": "Hey! How can I assist you today? WhatsApp: https://wa.me/923440192535",
    "thanks": "You're welcome! Contact me on WhatsApp if you want to start a project: https://wa.me/923440192535",
    "thank you": "My pleasure! 😊 Reach me on WhatsApp: https://wa.me/923440192535",

    // Web Development
    "web development": "I provide professional front-end web development including HTML, CSS, and JavaScript. WhatsApp: https://wa.me/923440192535",
    "website": "I can build modern and responsive websites tailored to your business. WhatsApp: https://wa.me/923440192535",
    "frontend": "I specialize in front-end development with HTML, CSS, and JavaScript. WhatsApp: https://wa.me/923440192535",
    "website design": "I design professional and responsive websites. Let's discuss on WhatsApp: https://wa.me/923440192535",

    // Graphic Design
    "graphic design": "I create professional logos, banners, social media posts, and marketing designs. WhatsApp: https://wa.me/923440192535",
    "logo design": "I design creative logos that match your brand. WhatsApp: https://wa.me/923440192535",
    "banner design": "I can design eye-catching banners for social media or websites. WhatsApp: https://wa.me/923440192535",
    "social media design": "I create professional graphics for social media campaigns. WhatsApp: https://wa.me/923440192535",

    // Video Editing
    "video editing": "I provide high-quality video editing with effects, transitions, and animations. WhatsApp: https://wa.me/923440192535",
    "edit video": "I can edit your videos professionally for YouTube, social media, or personal projects. WhatsApp: https://wa.me/923440192535",
    "youtube video": "I create and edit YouTube videos with modern effects. WhatsApp: https://wa.me/923440192535",

    // Accounting
    "accounting": "I provide reliable business accounting solutions, including bookkeeping and financial reports. WhatsApp: https://wa.me/923440192535",
    "bookkeeping": "I can manage your bookkeeping professionally. WhatsApp: https://wa.me/923440192535",
    "financial report": "I prepare detailed financial reports for your business. WhatsApp: https://wa.me/923440192535",

    // Pricing / Quotes
    "price": "Pricing depends on the type and scope of your project. WhatsApp me with details: https://wa.me/923440192535",
    "cost": "Cost varies depending on your project. Send details on WhatsApp: https://wa.me/923440192535",
    "quote": "I provide quotes after understanding your requirements. WhatsApp: https://wa.me/923440192535",

    // Portfolio / Work Samples
    "portfolio": "You can view my portfolio of Web Development, Graphic Design, Video Editing, and Accounting work. WhatsApp: https://wa.me/923440192535",
    "work sample": "I can share my previous work samples. Contact me on WhatsApp: https://wa.me/923440192535",

    // Contact
    "contact": "You can contact me directly on WhatsApp for fast responses: https://wa.me/923440192535",
    "whatsapp": "Here’s my WhatsApp link to discuss your project: https://wa.me/923440192535",

    // Other Common Questions
    "services": "I offer Front-end Web Development, Graphic Designing, Video Editing, and Accounting. WhatsApp: https://wa.me/923440192535",
    "work time": "I work 7 days a week and usually respond quickly on WhatsApp: https://wa.me/923440192535",
    "availability": "I am available to start new projects immediately. WhatsApp: https://wa.me/923440192535",
    "how to hire": "You can hire me by contacting me directly on WhatsApp: https://wa.me/923440192535",

    // Fallback
    "default": "I’m sorry, I didn’t understand that. Ask about my services, pricing, portfolio, or contact me on WhatsApp: https://wa.me/923440192535"
};

// ===== Typing Effect =====
function botTyping(text, callback) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot');
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    let i = 0;
    const typingSpeed = 25; // milliseconds per letter

    function typeLetter() {
        if (i < text.length) {
            msgDiv.textContent += text.charAt(i);
            i++;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(typeLetter, typingSpeed);
        } else {
            if (callback) callback();
        }
    }
    typeLetter();
}

// ===== Get Bot Response =====
function getBotResponse(message) {
    message = message.toLowerCase();
    for (let key in answers) {
        if (message.includes(key)) return answers[key];
    }
    return answers["default"];
}

// ===== Add User Message =====
function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'user');
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== Handle Send =====
function handleSend() {
    const message = userInput.value.trim();
    if (message === "") return;
    addUserMessage(message);
    userInput.value = '';

    setTimeout(() => {
        botTyping(getBotResponse(message));
    }, 300);
}

// ===== Event Listeners =====
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});