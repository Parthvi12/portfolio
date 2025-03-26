// Floating Background Images Animation
document.addEventListener('DOMContentLoaded', () => {
    // Create floating background container
    const floatingBg = document.createElement('div');
    floatingBg.className = 'floating-bg';
    document.body.prepend(floatingBg);

    // Array of image paths - replace with your actual image paths
    const images = [
        'path/to/image1.png',
        'path/to/image2.png',
        'path/to/image3.png',
        'path/to/image4.png',
        'path/to/image5.png'
    ];

    // Calculate number of images based on screen size
    const getImageCount = () => {
        if (window.innerWidth < 576) return 3;
        if (window.innerWidth < 768) return 4;
        return 5;
    };

    // Create floating images
    const createFloatingImages = () => {
        const imageCount = getImageCount();
        const existingImages = document.querySelectorAll('.floating-image');
        existingImages.forEach(img => img.remove());

        for (let i = 0; i < imageCount; i++) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'floating-image';
            
            const img = document.createElement('img');
            img.src = images[i % images.length];
            img.alt = `Floating background ${i + 1}`;
            
            imgContainer.appendChild(img);
            floatingBg.appendChild(imgContainer);

            // Random initial position with better distribution
            const randomX = gsap.utils.random(-30, 30);
            const randomY = gsap.utils.random(-30, 30);
            const randomRotation = gsap.utils.random(-15, 15);
            const randomScale = gsap.utils.random(0.8, 1.2);

            // Set initial position
            gsap.set(imgContainer, {
                x: `${randomX}%`,
                y: `${randomY}%`,
                rotation: randomRotation,
                scale: randomScale
            });

            // Create floating animation with smoother movement
            gsap.to(imgContainer, {
                y: `${randomY + gsap.utils.random(-3, 3)}%`,
                rotation: randomRotation + gsap.utils.random(-3, 3),
                duration: gsap.utils.random(4, 6),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: gsap.utils.random(0, 2)
            });
        }
    };

    // Initial creation
    createFloatingImages();

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createFloatingImages();
        }, 250);
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        const floatingImages = document.querySelectorAll('.floating-image');
        if (document.hidden) {
            floatingImages.forEach(img => {
                gsap.to(img, { duration: 0.3, opacity: 0 });
            });
        } else {
            floatingImages.forEach(img => {
                gsap.to(img, { duration: 0.3, opacity: 0.08 });
            });
        }
    });

    // Handle scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const floatingImages = document.querySelectorAll('.floating-image');
            const scrollSpeed = Math.abs(window.scrollY - window.lastScrollY) / 16;
            window.lastScrollY = window.scrollY;

            if (scrollSpeed > 5) {
                floatingImages.forEach(img => {
                    gsap.to(img, { duration: 0.2, opacity: 0.04 });
                });
            } else {
                floatingImages.forEach(img => {
                    gsap.to(img, { duration: 0.3, opacity: 0.08 });
                });
            }
        }, 16);
    });
}); 