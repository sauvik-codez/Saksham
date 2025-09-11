// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    
    hamburger.addEventListener('click', function() {
        navRight.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-right') && !event.target.closest('.hamburger')) {
            navRight.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Header animation
    const animatedTitle = document.querySelector('.animated-title');
    if (animatedTitle) {
        // Add a small delay for the animation to be more noticeable
        setTimeout(() => {
            animatedTitle.style.opacity = '1';
            animatedTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Alert updates simulation
    simulateLiveAlerts();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-right a');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        featureCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('appear');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// Simulate live alerts updates
function simulateLiveAlerts() {
    const alertContainer = document.querySelector('.alert-container');
    if (!alertContainer) return;
    
    // Sample alerts data
    const alertTypes = [
        { type: 'URGENT', class: 'urgent', content: 'Heavy rainfall warning in coastal areas. Stay indoors.' },
        { type: 'WARNING', class: 'warning', content: 'Heatwave alert: Temperatures expected to reach 45°C tomorrow.' },
        { type: 'INFO', class: 'info', content: 'New flood preparedness guide available in Classroom section.' },
        { type: 'URGENT', class: 'urgent', content: 'Cyclone evacuation procedures activated in Eastern regions.' },
        { type: 'WARNING', class: 'warning', content: 'Earthquake drill scheduled for all schools next week.' }
    ];
    
    // Function to add a new alert
    function addNewAlert() {
        // Remove the oldest alert if there are more than 3
        if (alertContainer.children.length >= 3) {
            alertContainer.removeChild(alertContainer.lastElementChild);
        }
        
        // Get random alert
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        // Create new alert element
        const newAlert = document.createElement('div');
        newAlert.className = 'alert-item';
        newAlert.innerHTML = `
            <span class="alert-badge ${randomAlert.class}">${randomAlert.type}</span>
            <p>${randomAlert.content}</p>
            <span class="alert-time">Just now</span>
        `;
        
        // Add with animation
        newAlert.style.opacity = '0';
        newAlert.style.transform = 'translateY(-20px)';
        alertContainer.prepend(newAlert);
        
        // Animate in
        setTimeout(() => {
            newAlert.style.transition = 'opacity 0.5s, transform 0.5s';
            newAlert.style.opacity = '1';
            newAlert.style.transform = 'translateY(0)';
        }, 100);
        
        // Update time text after a moment
        setTimeout(() => {
            newAlert.querySelector('.alert-time').textContent = '1 min ago';
        }, 60000);
    }
    
    // Add initial alerts
    for (let i = 0; i < 3; i++) {
        addNewAlert();
    }
    
    // Add new alert periodically (every 2 minutes)
    setInterval(addNewAlert, 120000);
}

// Handle responsive behavior for the alerts section
function handleAlertResponsiveness() {
    const alertItems = document.querySelectorAll('.alert-item');
    const screenWidth = window.innerWidth;
    
    alertItems.forEach(item => {
        if (screenWidth < 768) {
            // Stack elements vertically on mobile
            item.style.flexDirection = 'column';
            item.style.alignItems = 'flex-start';
            item.style.gap = '0.5rem';
        } else {
            // Horizontal layout on larger screens
            item.style.flexDirection = 'row';
            item.style.alignItems = 'center';
            item.style.gap = '0';
        }
    });
}

// Initialize on load and on resize
window.addEventListener('load', handleAlertResponsiveness);
window.addEventListener('resize', handleAlertResponsiveness);