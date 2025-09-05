// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 8; // Total number of images

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    updateCarousel();
    
    // Auto-play carousel every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    const carousel = document.querySelector('.carousel');
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
});

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    // Move the track
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Smooth scrolling for anchor links
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

// Video autoplay handling for mobile
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    const loadingElement = document.querySelector('.video-loading');
    const playBtn = document.querySelector('.play-btn');
    
    // Hide loading when video is ready
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded, attempting to play');
        loadingElement.classList.add('hidden');
        video.play().catch(e => {
            console.log('Autoplay prevented:', e);
            playBtn.style.display = 'block';
        });
    });
    
    video.addEventListener('canplay', function() {
        console.log('Video can play, attempting to play');
        loadingElement.classList.add('hidden');
        video.play().catch(e => {
            console.log('Video play failed:', e);
            playBtn.style.display = 'block';
        });
    });
    
    video.addEventListener('playing', function() {
        console.log('Video is playing');
        playBtn.style.display = 'none';
        loadingElement.classList.add('hidden');
    });
    
    video.addEventListener('error', function(e) {
        console.log('Video error:', e);
        loadingElement.classList.add('hidden');
        playBtn.style.display = 'block';
        // Add fallback background image if video fails
        const videoContainer = document.querySelector('.video-container');
        videoContainer.style.backgroundImage = 'url("https://zucoomg-assets.s3.us-east-2.amazonaws.com/zuco1.png")';
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.style.backgroundPosition = 'center';
    });
    
    // Play video when user interacts with the page
    document.addEventListener('touchstart', function() {
        video.play().catch(e => {
            console.log('Video play failed on touch:', e);
        });
    }, { once: true });
    
    document.addEventListener('click', function() {
        video.play().catch(e => {
            console.log('Video play failed on click:', e);
        });
    }, { once: true });
    
    // Force play after a short delay
    setTimeout(() => {
        video.play().catch(e => {
            console.log('Delayed video play failed:', e);
        });
    }, 1000);
});

// Manual play function
function playVideo() {
    const video = document.querySelector('video');
    const playBtn = document.querySelector('.play-btn');
    
    video.play().then(() => {
        console.log('Video started playing');
        playBtn.style.display = 'none';
    }).catch(e => {
        console.log('Manual play failed:', e);
        // Try to load the video again
        video.load();
        video.play().catch(err => {
            console.log('Retry play failed:', err);
        });
    });
}

// Fullscreen video functions
function openFullscreen() {
    const modal = document.getElementById('videoModal');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Play the video in fullscreen
    fullscreenVideo.play().catch(e => {
        console.log('Fullscreen video play failed:', e);
    });
}

function closeFullscreen() {
    const modal = document.getElementById('videoModal');
    const fullscreenVideo = document.getElementById('fullscreenVideo');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Pause the video when closing
    fullscreenVideo.pause();
    fullscreenVideo.currentTime = 0; // Reset to beginning
}

// Close modal when clicking outside the video
document.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.video-modal-content');
    
    if (event.target === modal) {
        closeFullscreen();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const videoModal = document.getElementById('videoModal');
        const pdfModal = document.getElementById('pdfModal');
        if (videoModal.style.display === 'block') {
            closeFullscreen();
        }
        if (pdfModal.style.display === 'block') {
            closePdfPreview();
        }
    }
});

// PDF Preview functions
function openPdfPreview() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Load the PDF in the iframe
    iframe.src = 'https://zucoomg-assets.s3.us-east-2.amazonaws.com/ZUCO+OMG+-+Onesheet+actualizado+.pdf#toolbar=1&navpanes=1&scrollbar=1&zoom=FitH';
}

function closePdfPreview() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Clear the iframe source to stop loading
    iframe.src = '';
}

// Close PDF modal when clicking outside
document.addEventListener('click', function(event) {
    const pdfModal = document.getElementById('pdfModal');
    const videoModal = document.getElementById('videoModal');
    
    if (event.target === pdfModal) {
        closePdfPreview();
    }
    if (event.target === videoModal) {
        closeFullscreen();
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about, .gallery, .onesheet, .social');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/zuco1.png',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/zuco2.png',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/zuco3.png',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/charlot3.jpg',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/charlot1.jpg',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/campin3.jpg',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/campin2.jpg',
        'https://zucoomg-assets.s3.us-east-2.amazonaws.com/campin1.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images when page loads
document.addEventListener('DOMContentLoaded', preloadImages);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate carousel position on resize
    updateCarousel();
});

// Add loading states
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.log('Image failed to load:', this.src);
    });
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
