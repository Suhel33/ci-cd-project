// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove Loader
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);

    // Initialize Animations
    AOS.init({ duration: 1000, once: true });
});

// Navbar Scroll Effect
window.onscroll = function() {
    const nav = document.getElementById('mainNav');
    const scrollBtn = document.getElementById('scrollTop');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        scrollBtn.style.display = "block";
    } else {
        nav.classList.remove('scrolled');
        scrollBtn.style.display = "none";
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const sInput = document.getElementById('serviceSearch');
    const lInput = document.getElementById('locationSearch');
    const megaPop = document.getElementById('megaDropdown');

    // Item click handling
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('mousedown', function(e) { // mousedown use karein focus lost hone se pehle
            const val = this.innerText;
            if(this.getAttribute('data-type') === 'location') {
                lInput.value = val.replace('📍', '').trim();
            } else {
                sInput.value = val.trim();
            }
        });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if(e.key === "Escape") {
            sInput.blur();
            lInput.blur();
        }
    });
});

// Price Calculator Logic
function calculateTotal() {
    const guests = document.getElementById('guests').value;
    const isAC = document.getElementById('acReq').checked;
    
    if (!guests || guests <= 0) {
        alert("Please enter a valid number of guests");
        return;
    }

    let basePrice = 30000;
    let guestCost = guests * 300;
    let acCost = isAC ? 20000 : 0;
    
    // Total calculation
    let total = basePrice + guestCost + acCost;

    const display = document.getElementById('totalDisplay');
    const box = document.getElementById('resultBox');
    
    box.classList.remove('d-none');
    display.innerText = "₹" + total.toLocaleString('en-IN');

    // Trigger Confetti for engagement
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#ffffff']
    });
}

// Form Submission
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you! Our wedding planner will call you within 24 hours.");
    this.reset();
});

// Scroll to Top
document.getElementById('scrollTop').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};




// services js 


// pop up form
document.addEventListener('DOMContentLoaded', function() {
    // 1. Auto-show modal after 2 seconds (optional)
    setTimeout(function() {
        var myModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        myModal.show();
    }, 2000);

    // 2. Form Submission Handling
    const bookingForm = document.getElementById("bookingForm");
    const successMsg = document.getElementById("successMessage");

    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Button Loading State
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btn.disabled = true;

        // Simulate API Call
        setTimeout(() => {
            bookingForm.classList.add('d-none'); // Hide Form
            successMsg.classList.remove('d-none'); // Show Success
            
            // Optional: Close modal after 4 seconds
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
            }, 4000);
        }, 1500);
    });
});


// review section
var swiper = new Swiper(".finalSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      992: { slidesPerView: 2 }, // Desktop pe 2 cards
    },
  });




   // Updated Data Object with all categories
        const galleryData = {
            wedding: { 
                title: "Royal Wedding Archive", 
                items: ["image/field_gate1.png", "image/field_gate1.png", "image/field_gate1.png"] 
            },
            haldi: { 
                title: "Vibrant Haldi Memories", 
                items: ["image/field_gate1.png", "image/field_gate1.png"] 
            },
            mehndi: { 
                title: "Mehndi Designs & Joy", 
                items: ["image/field_gate1.png", "image/field_gate1.png"] 
            },
            birthday: { 
                title: "Joyful Birthday Bashes", 
                items: ["image/field_gate1.png"] 
            }
        };

        $(window).on('load', function() {
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: { columnWidth: '.grid-item' }
            });
            $grid.imagesLoaded().progress(() => $grid.isotope('layout'));

            $('.filter-btn').on('click', function() {
                $('.filter-btn').removeClass('active');
                $(this).addClass('active');
                $grid.isotope({ filter: $(this).attr('data-filter') });
            });
        });

        function openForm(category) {
            const data = galleryData[category];
            if(!data) {
                console.error("No data found for category:", category);
                return;
            }
            document.getElementById('formTitle').innerText = data.title;
            const body = document.getElementById('formBody');
            body.innerHTML = '';
            
            data.items.forEach((src, i) => {
                const img = document.createElement('img');
                img.src = src;
                img.onclick = () => openLightbox(src);
                img.style.opacity = '0';
                img.onload = function() { this.style.opacity = '1'; };
                body.appendChild(img);
            });
            toggleModal(true);
        }

        function toggleModal(show) {
            const overlay = document.getElementById('modalOverlay');
            overlay.classList.toggle('active', show);
            document.body.style.overflow = show ? 'hidden' : 'auto';
        }

        function openLightbox(src) {
            document.getElementById('fullImage').src = src;
            document.getElementById('lightboxOverlay').style.display = 'flex';
        }

        function closeLightboxDirect() {
            document.getElementById('lightboxOverlay').style.display = 'none';
        }

        function closeLightbox(e) {
            if(e.target.id === 'lightboxOverlay') closeLightboxDirect();
        }

        function closeForm(e) { 
            if(e.target.id === 'modalOverlay') toggleModal(false); 
        }

        window.onkeydown = (e) => { 
            if(e.keyCode == 27) { toggleModal(false); closeLightboxDirect(); } 
        };