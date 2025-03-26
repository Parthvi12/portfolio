// Timeline Navigation and Progress
class Timeline {
    constructor() {
        this.items = document.querySelectorAll('.timeline-item');
        this.navItems = document.querySelectorAll('.timeline-nav-item');
        this.progress = document.querySelector('.timeline-progress');
        this.modal = document.querySelector('.timeline-modal');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Initialize navigation
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', () => this.scrollToItem(index));
        });
        
        // Initialize scroll progress
        window.addEventListener('scroll', () => this.updateProgress());
        
        // Initialize item click handlers
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => this.showModal(index));
        });
        
        // Initialize modal close
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Initialize intersection observer for animations
        this.initIntersectionObserver();
        
        // Initial progress update
        this.updateProgress();
    }
    
    scrollToItem(index) {
        const item = this.items[index];
        if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.updateActiveNav(index);
        }
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        this.progress.style.transform = `scaleX(${progress / 100})`;
    }
    
    updateActiveNav(index) {
        this.navItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    showModal(index) {
        const item = this.items[index];
        if (!item || !this.modal) return;
        
        // Clone the item content for the modal
        const content = item.cloneNode(true);
        content.classList.add('timeline-modal-content');
        
        // Clear and populate modal
        this.modal.innerHTML = '';
        this.modal.appendChild(content);
        
        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update active nav
        this.updateActiveNav(index);
    }
    
    hideModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.items).indexOf(entry.target);
                    this.updateActiveNav(index);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.items.forEach(item => observer.observe(item));
    }
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Timeline();
}); 