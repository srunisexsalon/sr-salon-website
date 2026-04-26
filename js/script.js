// ================================
// SR UNISEX SALON - MAIN SCRIPT
// CLEAN + FIXED + SEO READY
// ================================

const PHONE_NUMBER = '+919430001237';
const PHONE_DISPLAY = '+91 94300 01237';

/* =========================
   MOBILE MENU
========================= */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    if (!menu || !icon) return;

    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    if (!menu || !icon) return;

    menu.classList.add('hidden');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
}

/* =========================
   PHONE ACCESSIBILITY
========================= */
function setPhoneLinkAccessibility() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Call ${PHONE_DISPLAY}`);
        }
    });
}

/* =========================
   MOBILE CALL LINK AUTO ADD
========================= */
function addMobileCallLink() {
    document.querySelectorAll('#mobile-menu').forEach(menu => {
        if (!menu) return;

        const existingLink = menu.querySelector('a[href^="tel:"]');
        if (!existingLink) {
            const callItem = document.createElement('a');
            callItem.href = `tel:${PHONE_NUMBER}`;
            callItem.className = 'py-2 inline-flex items-center gap-3 font-semibold text-black';
            callItem.innerHTML = '<i class="fa-solid fa-phone"></i> Call Now';
            callItem.setAttribute('aria-label', `Call ${PHONE_DISPLAY}`);

            menu.prepend(callItem);
        }
    });
}

/* =========================
   BOOKING MODAL (WHATSAPP)
========================= */
function setupBookingModal() {
    const modal = document.getElementById('booking-modal');
    const openButtons = document.querySelectorAll('[data-book-modal]');
    const closeButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];
    const bookingForm = document.getElementById('booking-form');

    if (!modal) return;

    function openModal(event) {
        event?.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        console.log('Booking modal opened');
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        console.log('Booking modal closed');
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = bookingForm.querySelector('[name="name"]').value.trim();
            const phone = bookingForm.querySelector('[name="phone"]').value.trim();
            const service = bookingForm.querySelector('[name="service"]').value;

            if (!name || !phone) {
                alert('Please enter your name and mobile number.');
                return;
            }

            let normalizedPhone = phone.replace(/\D/g, '');

            if (normalizedPhone.length === 10) {
                normalizedPhone = '91' + normalizedPhone;
            } else if (!(normalizedPhone.length === 12 && normalizedPhone.startsWith('91'))) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            const message = encodeURIComponent(
                `Hi SR Unisex Salon, I want to book an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${service}`
            );

            window.open(`https://wa.me/919430001237?text=${message}`, '_blank', 'noopener');
            closeModal();
        });
    }
}

/* =========================
   SMOOTH SCROLL FIXED
========================= */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            if (this.hasAttribute('data-book-modal')) return;

            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
            }
        });
    });
}

/* =========================
   MOBILE MENU CLOSE ON CLICK
========================= */
function setupMobileMenuLinks() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

/* =========================
   SECURITY FIX
========================= */
function setExternalLinkSecurity() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

/* =========================
   ACCESSIBILITY FIX
========================= */
function setupAccessibility() {
    const menuButton = document.getElementById('mobile-menu-btn');

    if (menuButton) {
        menuButton.setAttribute('type', 'button');
        menuButton.setAttribute('aria-label', 'Toggle mobile menu');
    }
}

/* =========================
   SEO INTERNAL LINK SYSTEM (NEW FIXED)
========================= */
const INTERNAL_LINKS = {
    "best salon in Gaya": "/index.html",
    "best facial in Gaya": "/services/facial-skin-care-gaya.html",
    "hair care in Gaya": "/services/hair-spa-treatment-gaya.html",
    "nail care in Gaya": "/services/manicure-pedicure-gaya.html",
    "best bridal makeup in Gaya": "/services/bridal-makeup-gaya.html",
    "advanced facial in Gaya": "/services/advanced-facial-gaya.html",
    "d-tan cleanup in Gaya": "/services/d-tan-cleanup-gaya.html",
    "best haircut in Gaya": "/services/hair-cut-styling-gaya.html",
    "skin treatments in Gaya": "/services/skin-treatments-gaya.html",
    "beauty blog in Gaya": "/blog/blog.html",
    "skincare tips in Gaya": "/blog/skincare-tips.html",
    "hair care tips in Gaya": "/blog/hair-care-tips.html",
    "nail care tips in Gaya": "/blog/nail-care-tips.html",
    "bridal makeup trends in Gaya": "/blog/bridal-makeup-trends.html",
    'facial routine tips in Gaya': '/blog/facial-routine-tips.html',
    "men  grooming tips in Gaya": "/blog/men-grooming-tips.html"
};

/* Optional function (use in blog pages if needed) */
function autoInternalLink(content) {
    let updated = content;

    Object.entries(INTERNAL_LINKS).forEach(([keyword, link]) => {
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

        updated = updated.replace(
            regex,
            `<a href="${link}" class="text-[#d4af77] font-semibold hover:underline">$1</a>`
        );
    });

    return updated;
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', function () {

    const menuButton = document.getElementById('mobile-menu-btn');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMobileMenu);
    }

    setupSmoothScroll();
    setupMobileMenuLinks();
    setPhoneLinkAccessibility();
    addMobileCallLink();
    setupBookingModal();
    setExternalLinkSecurity();
    setupAccessibility();

    console.log('%c✅ SR Unisex Salon Loaded Successfully 🚀', 'color:#d4af77;font-size:12px');
});