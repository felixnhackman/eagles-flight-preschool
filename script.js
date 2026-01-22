// Smooth scrolling for navigation links
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

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (placeholder for future implementation)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Form submission is now handled by FormSubmit service
// The form will automatically send emails to eaglesflightpreeschool@gmail.com

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and program cards
document.querySelectorAll('.feature-card, .program-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');
    if (heroDecoration) {
        heroDecoration.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// GALLERY FUNCTIONALITY
// ============================================

const galleryImages = document.querySelectorAll('.gallery-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const currentImageSpan = document.querySelector('.current-image');
const totalImagesSpan = document.querySelector('.total-images');

let currentIndex = 0;
const totalImages = galleryImages.length;

// Update total images count
if (totalImagesSpan) {
    totalImagesSpan.textContent = totalImages;
}

// Function to show image at specific index
function showImage(index) {
    // Remove active class from all images and thumbnails
    galleryImages.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    // Add active class to current image and thumbnail
    if (galleryImages[index]) {
        galleryImages[index].classList.add('active');
    }
    if (thumbnails[index]) {
        thumbnails[index].classList.add('active');
    }

    // Update counter
    if (currentImageSpan) {
        currentImageSpan.textContent = index + 1;
    }

    currentIndex = index;
}

// Previous button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    });
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });
}

// Thumbnail click
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showImage(index);
    });
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && prevBtn) {
        prevBtn.click();
    } else if (e.key === 'ArrowRight' && nextBtn) {
        nextBtn.click();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const galleryDisplay = document.querySelector('.gallery-display');
if (galleryDisplay) {
    galleryDisplay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryDisplay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next image
            if (nextBtn) nextBtn.click();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous image
            if (prevBtn) prevBtn.click();
        }
    }
}

// Optional: Auto-play gallery (uncomment to enable)
// let autoplayInterval;
// function startAutoplay() {
//     autoplayInterval = setInterval(() => {
//         if (nextBtn) nextBtn.click();
//     }, 5000); // Change image every 5 seconds
// }

// function stopAutoplay() {
//     clearInterval(autoplayInterval);
// }

// // Start autoplay on page load
// if (galleryImages.length > 0) {
//     startAutoplay();
// }

// // Stop autoplay on user interaction
// document.querySelector('.gallery-main')?.addEventListener('mouseenter', stopAutoplay);
// document.querySelector('.gallery-main')?.addEventListener('mouseleave', startAutoplay);