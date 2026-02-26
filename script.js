// Custom Cursor
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('.custom-cursor');
    let cursorTrails = [];

    // Create cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    // Mouse move event
    document.addEventListener('mousemove', function (e) {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        // Update trails with delay
        setTimeout(() => {
            cursorTrails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.element.style.left = e.clientX + 'px';
                    trail.element.style.top = e.clientY + 'px';
                    trail.element.style.transform = 'translate(-50%, -50%)';
                }, index * 50);
            });
        }, 100);
    });

    // Mouse enter/leave events for hover effects
    document.addEventListener('mouseenter', function () {
        if (cursor) cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
        if (cursor) cursor.style.opacity = '0';
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(`
        a, button, .clickable, .btn-primary, .btn-secondary, .service-btn, 
        .filter-btn, .tab-links, .portfolio-dropdown-btn, .tab-dropdown-btn,
        .project-link, .social-icons a, .nav-btn, .dot, .testimonial-card,
        .faq-question, .contact-method, .process-step, .service-card,
        .work, .layer, .portfolio-dropdown-item, .tab-dropdown-item,
        .step-number, .skill-item, .timeline-item, .education-item,
        .motivation-item, .expertise-item, .stat-card, .achievement-tag,
        .highlight-tag, .feature-tag, .tech-tag, input[type="submit"],
        .loader, .logo, .header-buttons a, #cv-btn, #submit-btn,
        .fa-bars, .fa-circle-xmark, select, *[onclick], *[href],
        *[type="button"], *[type="submit"]
    `);
    const textElements = document.querySelectorAll('input, textarea');

    // Elements that should trigger dark cursor (buttons with gradient backgrounds)
    const darkCursorElements = document.querySelectorAll(`
        .btn-primary, .btn-secondary, .service-btn, .filter-btn.active,
        .header-buttons a, #cv-btn, #submit-btn, .portfolio-dropdown-btn,
        .tab-dropdown-btn, .project-link, .nav-btn, .contact-method
    `);

    // Function to check if element has gradient background
    function hasGradientBackground(element) {
        const computedStyle = window.getComputedStyle(element);
        const background = computedStyle.background || computedStyle.backgroundImage;
        return background.includes('gradient') ||
            element.classList.contains('btn-primary') ||
            element.classList.contains('btn-secondary') ||
            element.classList.contains('service-btn') ||
            element.classList.contains('header-buttons');
    }

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            if (cursor) {
                // Check if this element should have dark cursor
                if (darkCursorElements.length > 0 &&
                    (Array.from(darkCursorElements).includes(element) || hasGradientBackground(element))) {
                    cursor.classList.add('dark');
                    cursor.classList.remove('hover');
                } else {
                    cursor.classList.add('hover');
                    cursor.classList.remove('dark');
                }
            }
        });

        element.addEventListener('mouseleave', function () {
            if (cursor) {
                cursor.classList.remove('hover', 'dark');
            }
        });

        element.addEventListener('mousedown', function () {
            if (cursor) cursor.classList.add('click');
        });

        element.addEventListener('mouseup', function () {
            if (cursor) cursor.classList.remove('click');
        });
    });

    // Special cursor for text inputs
    textElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            if (cursor) cursor.classList.add('text');
        });

        element.addEventListener('mouseleave', function () {
            if (cursor) cursor.classList.remove('text');
        });
    });
});

// Loading Animation
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function () {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 2000);
});

// Typing Animation
const typingTexts = [
    "I Turn Ideas Into Digital Solutions",
    "I Build Mobile Apps That Scale Easily",
    "I Create Websites That Engage People",
    "I Turn Data Into Valuable Insights"
];
let currentText = 0;
let currentChar = 0;
let isDeleting = false;

function typeAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingTexts[currentText];

    if (isDeleting) {
        typingElement.textContent = text.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingElement.textContent = text.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === text.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentText = (currentText + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation after page load
window.addEventListener('load', function () {
    setTimeout(typeAnimation, 3000);
});

// Tab functionality
var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove('active-link');
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove('active-tab');
    }
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabname).classList.add('active-tab');
}

// Mobile menu functionality
var sidemenu = document.getElementById('sidemenu');

function openmenu() {
    console.log('Opening menu...'); // Debug log
    if (sidemenu) {
        sidemenu.style.right = "0px";
        document.body.classList.add('menu-open');
        console.log('Menu opened, right position:', sidemenu.style.right);
    } else {
        console.error('sidemenu element not found!');
    }
}

function closemenu() {
    console.log('Closing menu...'); // Debug log
    if (sidemenu) {
        sidemenu.style.right = "-250px";
        document.body.classList.remove('menu-open');
        console.log('Menu closed, right position:', sidemenu.style.right);
    } else {
        console.error('sidemenu element not found!');
    }
}

// Test function to verify menu works
function testMobileMenu() {
    console.log('Testing mobile menu...');
    console.log('sidemenu element:', sidemenu);
    console.log('Current right position:', sidemenu ? sidemenu.style.right : 'N/A');

    if (sidemenu) {
        // Test opening
        sidemenu.style.right = "0px";
        console.log('Test: Opened menu to right: 0px');

        // Test closing after 2 seconds
        setTimeout(() => {
            sidemenu.style.right = "-250px";
            console.log('Test: Closed menu to right: -250px');
        }, 2000);
    }
}

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing mobile menu...');

    // Verify elements exist
    const hamburger = document.querySelector('.fa-bars');
    const closeBtn = document.querySelector('#sidemenu .fa-circle-xmark');

    console.log('Hamburger element found:', !!hamburger);
    console.log('Close button found:', !!closeBtn);
    console.log('Sidemenu found:', !!sidemenu);

    // Set initial menu position
    if (sidemenu) {
        sidemenu.style.right = "-250px";
        console.log('Initial menu position set to -250px');
    }

    // Add click listeners as backup to inline onclick
    if (hamburger) {
        // Remove any existing event listeners
        hamburger.onclick = function (e) {
            console.log('Hamburger clicked via onclick');
            e.preventDefault();
            e.stopPropagation();
            openmenu();
        };

        hamburger.addEventListener('click', function (e) {
            console.log('Hamburger clicked via addEventListener');
            e.preventDefault();
            e.stopPropagation();
            openmenu();
        });

        // Make sure the element is clickable
        hamburger.style.pointerEvents = 'auto';
        hamburger.style.userSelect = 'none';

        console.log('Hamburger click handlers attached');
        console.log('Hamburger computed styles:', window.getComputedStyle(hamburger));
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            console.log('Close button clicked via addEventListener');
            e.preventDefault();
            e.stopPropagation();
            closemenu();
        });
    }

    // Test hamburger visibility on mobile
    function testHamburgerVisibility() {
        if (hamburger) {
            const styles = window.getComputedStyle(hamburger);
            console.log('Hamburger display:', styles.display);
            console.log('Hamburger visibility:', styles.visibility);
            console.log('Hamburger opacity:', styles.opacity);
            console.log('Hamburger z-index:', styles.zIndex);
            console.log('Screen width:', window.innerWidth);
        }
    }

    // Test visibility on load and resize
    testHamburgerVisibility();
    window.addEventListener('resize', testHamburgerVisibility);

});

// Portfolio Filter
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.work');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Testimonials Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
}

// Testimonial navigation
document.addEventListener('DOMContentLoaded', function () {
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play testimonials
    setInterval(nextSlide, 5000);
});

// Smooth scroll for navigation links
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

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill bars animation when skills tab is opened
document.addEventListener('DOMContentLoaded', function () {
    const skillsTab = document.querySelector('[onclick="opentab(\'skills\')"]');
    if (skillsTab) {
        skillsTab.addEventListener('click', () => {
            setTimeout(animateSkillBars, 200);
        });
    }
});

// Contact Form Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbzM00AYlLlzn_qNAX3U4KyR7fjObgZSOBNP6O-2FsCAjUYpyYfePLTUI9meezjZiR6O/exec';
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')
const submitBtn = document.getElementById('submit-btn')
const cvBtn = document.getElementById('cv-btn')

// CV Download Animation
if (cvBtn) {
    cvBtn.addEventListener('click', function () {
        const originalText = cvBtn.innerHTML;
        cvBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
        cvBtn.style.pointerEvents = 'none';

        setTimeout(function () {
            cvBtn.innerHTML = originalText;
            cvBtn.style.pointerEvents = 'auto';
        }, 2000);
    });
}

// Enhanced Form Submission
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()

        // Validate form
        const name = form.Name.value.trim();
        const email = form.Email.value.trim();
        const message = form.Message.value.trim();

        if (!name || !email || !message) {
            showMessage("Please fill in all required fields.", "error");
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            // parse whatever JSON the Apps Script returns and verify success flag
            .then(response => response.json())
            .then(data => {
                if (data.result && data.result === 'success') {
                    showMessage("🎉 Message sent successfully! I'll get back to you within 24 hours.", "success");
                    form.reset();
                } else {
                    // the script executed but reported an error; show short server message if available
                    console.error('Server error', data);
                    const serverMsg = (data.error && typeof data.error === 'string') ? data.error : (data.message || JSON.stringify(data));
                    showMessage("❌ There was a problem submitting the form: " + serverMsg.toString().slice(0, 200), "error");
                }

                // Reset button state in either case
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Network or parsing error', error);
                showMessage("❌ Error sending message. Please try again or contact me directly.", "error");

                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            })
    })
}

function showMessage(message, type) {
    msg.innerHTML = message;
    msg.className = `message ${type}`;
    msg.style.display = 'block';

    setTimeout(function () {
        msg.style.display = 'none';
    }, 5000)
}

// AOS Animation Initialization
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
});

// Mobile Dropdown Functionality
document.addEventListener('DOMContentLoaded', function () {
    // About Section Tab Dropdown
    const tabDropdownBtn = document.getElementById('tabDropdownBtn');
    const tabDropdownMenu = document.getElementById('tabDropdownMenu');
    const tabDropdownText = document.getElementById('tabDropdownText');
    const tabDropdownItems = document.querySelectorAll('.tab-dropdown-item');

    if (tabDropdownBtn && tabDropdownMenu) {
        tabDropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            tabDropdownMenu.classList.toggle('active');
            tabDropdownBtn.classList.toggle('active');
        });

        tabDropdownItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                // Remove active class from all items
                tabDropdownItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');

                // Update dropdown text
                const text = this.querySelector('span').textContent;
                tabDropdownText.textContent = text;

                // Close dropdown
                tabDropdownMenu.classList.remove('active');
                tabDropdownBtn.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!tabDropdownBtn.contains(e.target) && !tabDropdownMenu.contains(e.target)) {
                tabDropdownMenu.classList.remove('active');
                tabDropdownBtn.classList.remove('active');
            }
        });
    }

    // Portfolio Filter Dropdown
    const portfolioDropdownBtn = document.getElementById('portfolioDropdownBtn');
    const portfolioDropdownMenu = document.getElementById('portfolioDropdownMenu');
    const portfolioDropdownText = document.getElementById('portfolioDropdownText');
    const portfolioDropdownItems = document.querySelectorAll('.portfolio-dropdown-item');
    const portfolioItems = document.querySelectorAll('.work');

    if (portfolioDropdownBtn && portfolioDropdownMenu) {
        portfolioDropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            portfolioDropdownMenu.classList.toggle('active');
            portfolioDropdownBtn.classList.toggle('active');
        });

        portfolioDropdownItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                const filter = this.getAttribute('data-filter');

                // Remove active class from all items
                portfolioDropdownItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');

                // Update dropdown text
                const text = this.querySelector('span').textContent;
                portfolioDropdownText.textContent = text;

                // Close dropdown
                portfolioDropdownMenu.classList.remove('active');
                portfolioDropdownBtn.classList.remove('active');

                // Filter portfolio items
                portfolioItems.forEach(portfolioItem => {
                    if (filter === 'all' || portfolioItem.classList.contains(filter)) {
                        portfolioItem.style.display = 'block';
                        setTimeout(() => {
                            portfolioItem.style.opacity = '1';
                            portfolioItem.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        portfolioItem.style.opacity = '0';
                        portfolioItem.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            portfolioItem.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!portfolioDropdownBtn.contains(e.target) && !portfolioDropdownMenu.contains(e.target)) {
                portfolioDropdownMenu.classList.remove('active');
                portfolioDropdownBtn.classList.remove('active');
            }
        });
    }
});

// FAQ Accordion Functionality
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // If the clicked item wasn't active, open it
    if (!isActive) {
        faqItem.classList.add('active');
    }
}
