
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const nav = document.querySelector('header');
    const menu = document.querySelector('.menu');
    
    if (nav && menu) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        nav.insertBefore(menuToggle, menu);
        
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Services Slider
    const slider = document.querySelector('.services-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slidePosition = 0;
    
    function updateSlider() {
        const itemWidth = document.querySelector('.service').offsetWidth + 20; // Width + gap
        const containerWidth = slider.parentElement.offsetWidth;
        const maxSlides = Math.max(0, slider.children.length - Math.floor(containerWidth / itemWidth));
        
        prevBtn.style.display = slidePosition <= 0 ? 'none' : 'flex';
        nextBtn.style.display = slidePosition >= maxSlides ? 'none' : 'flex';
        
        slider.style.transform = `translateX(-${slidePosition * itemWidth}px)`;
    }

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (slidePosition > 0) {
                slidePosition--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            slidePosition++;
            updateSlider();
        });

        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    // Intersection Observer for lazy loading animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe all features and services
    document.querySelectorAll('.feature, .service').forEach(element => {
        observer.observe(element);
    });

    // Gallery Slider
    const gallerySlider = document.querySelector('.gallery-grid');
    const prevGallery = document.querySelector('.prev-gallery');
    const nextGallery = document.querySelector('.next-gallery');
    let galleryPosition = 0;
    
    function updateGallerySlider() {
        const itemWidth = document.querySelector('.gallery-item').offsetWidth + 20;
        const containerWidth = gallerySlider.parentElement.offsetWidth;
        const maxSlides = Math.max(0, gallerySlider.children.length - Math.floor(containerWidth / itemWidth));
        
        prevGallery.style.display = galleryPosition <= 0 ? 'none' : 'flex';
        nextGallery.style.display = galleryPosition >= maxSlides ? 'none' : 'flex';
        
        gallerySlider.style.transform = `translateX(-${galleryPosition * itemWidth}px)`;
    }

    if (prevGallery && nextGallery) {
        prevGallery.addEventListener('click', () => {
            if (galleryPosition > 0) {
                galleryPosition--;
                updateGallerySlider();
            }
        });

        nextGallery.addEventListener('click', () => {
            galleryPosition++;
            updateGallerySlider();
        });

        window.addEventListener('resize', updateGallerySlider);
        updateGallerySlider();
    }

    // Gallery Modal
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('#modal-img');
    const closeModal = document.querySelector('.close-modal');
    const prevModal = document.querySelector('.prev-modal');
    const nextModal = document.querySelector('.next-modal');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            currentImageIndex = index;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevModal.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImg.src = galleryItems[currentImageIndex].src;
    });

    nextModal.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        modalImg.src = galleryItems[currentImageIndex].src;
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});


// proces menu
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth >= 992) {
        const dropdown = document.querySelector('.dropdown-submenu');
        const submenu = dropdown.querySelector('.dropdown-menu');

        dropdown.addEventListener('mouseenter', function () {
            submenu.classList.add('show');

            // Tính toán vị trí submenu
            const rect = submenu.getBoundingClientRect();
            const spaceRight = window.innerWidth - rect.left;
            const spaceLeft = rect.left;

            // Reset class
            submenu.classList.remove('drop-left', 'drop-stack');

            // Nếu thiếu chỗ bên phải, dùng class drop-left
            if (spaceRight < submenu.offsetWidth && spaceLeft > submenu.offsetWidth) {
                submenu.classList.add('drop-left');
            } else if (spaceRight < submenu.offsetWidth && spaceLeft < submenu.offsetWidth) {
                // Nếu thiếu cả 2 bên, xếp dọc
                submenu.classList.add('drop-stack');
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            submenu.classList.remove('show');
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const isMobile = () => window.innerWidth <= 991;

    document.querySelectorAll('.nav-item.dropdown > a').forEach(function (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault(); // Ngăn chuyển trang
                const parent = this.parentElement;
                parent.classList.toggle('show'); // Toggle class để hiển thị submenu
            }
        });
    });
});
