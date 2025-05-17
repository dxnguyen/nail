
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
    const slider = document.querySelector('.slider-track');
    const wrapper = document.getElementById('slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideIndex = 0;
    let isHovered = false;

    function getItemWidth() {
        return slider.querySelector('.slider-item').offsetWidth;
    }

    function updateSlide() {
        const offset = getItemWidth() * slideIndex;
        slider.style.transform = `translateX(-${offset}px)`;
    }

    function slideNext() {
        const maxIndex = slider.children.length - Math.floor(wrapper.offsetWidth / getItemWidth());
        slideIndex = slideIndex < maxIndex ? slideIndex + 1 : 0;
        updateSlide();
    }

    function slidePrev() {
        const maxIndex = slider.children.length - Math.floor(wrapper.offsetWidth / getItemWidth());
        slideIndex = slideIndex > 0 ? slideIndex - 1 : maxIndex;
        updateSlide();
    }

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    let autoSlide = setInterval(() => {
        if (!isHovered) slideNext();
    }, 3000);

    wrapper.addEventListener('mouseenter', () => isHovered = true);
    wrapper.addEventListener('mouseleave', () => isHovered = false);

    // Kéo chuột để trượt
    let isDown = false;
    let startX;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        clearInterval(autoSlide);
    });

    slider.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        const diff = e.pageX - startX;
        if (diff > 50) slidePrev();
        else if (diff < -50) slideNext();
        isDown = false;
        autoSlide = setInterval(() => {
            if (!isHovered) slideNext();
        }, 3000);
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    window.addEventListener('resize', updateSlide);




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



//gallery slider
const customTrack = document.getElementById('customGalleryTrack');
const customPrevBtn = document.querySelector('.custom-prev-btn');
const customNextBtn = document.querySelector('.custom-next-btn');
const customImages = document.querySelectorAll('.custom-gallery-item img');

let customSlidePos = 0;
const customMaxSlides = customImages.length - 5;

customPrevBtn.onclick = () => {
    if (customSlidePos > 0) {
        customSlidePos--;
        updateCustomGallery();
    }
};

customNextBtn.onclick = () => {
    if (customSlidePos < customMaxSlides) {
        customSlidePos++;
        updateCustomGallery();
    }
};

function updateCustomGallery() {
    const itemWidth = customImages[0].parentElement.offsetWidth;
    customTrack.style.transform = `translateX(-${customSlidePos * itemWidth}px)`;
}

// Lightbox
const customLightbox = document.getElementById('customLightbox');
const customLightboxImg = document.getElementById('customLightboxImg');
const customCloseBtn = document.getElementById('customClosePopup');
const customPrevPopup = document.getElementById('customPrevPopup');
const customNextPopup = document.getElementById('customNextPopup');
const customFullscreenBtn = document.getElementById('customFullscreenBtn');
let customCurrentIndex = 0;

customImages.forEach(img => {
    img.onclick = () => {
        customCurrentIndex = parseInt(img.dataset.index);
        showCustomLightbox(customCurrentIndex);
    };
});

function showCustomLightbox(index) {
    customLightbox.style.display = 'flex';
    customLightboxImg.src = customImages[index].src.replace("300x200", "900x600");
}

customCloseBtn.onclick = () => {
    customLightbox.style.display = 'none';
};

customPrevPopup.onclick = () => {
    customCurrentIndex = (customCurrentIndex - 1 + customImages.length) % customImages.length;
    showCustomLightbox(customCurrentIndex);
};

customNextPopup.onclick = () => {
    customCurrentIndex = (customCurrentIndex + 1) % customImages.length;
    showCustomLightbox(customCurrentIndex);
};

customFullscreenBtn.onclick = () => {
    if (customLightboxImg.requestFullscreen) {
        customLightboxImg.requestFullscreen();
    }
};

/////////

