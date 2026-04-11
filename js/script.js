// Mobile menu and booking modal functionality
const PHONE_NUMBER = '+919430001237';
const PHONE_DISPLAY = '+91 94300 01237';

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

function setPhoneLinkAccessibility() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Call ${PHONE_DISPLAY}`);
        }
    });
}

function addMobileCallLink() {
    document.querySelectorAll('#mobile-menu').forEach(menu => {
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

function setupBookingModal() {
    const modal = document.getElementById('booking-modal');
    const openButtons = document.querySelectorAll('[data-book-modal]');
    const closeButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];
    const bookingForm = document.getElementById('booking-form');

    if (!modal) return;

    function openModal(event) {
        if (event) event.preventDefault();
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

    openButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = bookingForm.querySelector('input[name="name"]').value.trim();
            const phone = bookingForm.querySelector('input[name="phone"]').value.trim();
            const service = bookingForm.querySelector('select[name="service"]').value;

            if (!name || !phone) {
                alert('Please enter your name and mobile number.');
                return;
            }

            let normalizedPhone = phone.replace(/\D/g, '');
            if (normalizedPhone.length === 10) {
                normalizedPhone = '91' + normalizedPhone;
            } else if (normalizedPhone.length === 12 && normalizedPhone.startsWith('91')) {
                // already formatted
            } else {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            const message = encodeURIComponent(`Hi SR Unisex Salon, I would like to book an appointment. Name: ${name}, Phone: ${phone}, Service: ${service}`);
            window.open(`https://wa.me/919430001237?text=${message}`, '_blank', 'noopener');
            closeModal();
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (anchor.hasAttribute('data-book-modal')) {
                return;
            }

            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });
}

function setupMobileMenuLinks() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function setExternalLinkSecurity() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

function setupAccessibility() {
    const menuButton = document.getElementById('mobile-menu-btn');
    if (menuButton) {
        menuButton.setAttribute('type', 'button');
        if (!menuButton.getAttribute('aria-label')) {
            menuButton.setAttribute('aria-label', 'Toggle mobile menu');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
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

    console.log('%c✅ SR Unisex Salon Website Loaded Successfully! 🚀', 'color:#d4af77; font-size:12px; font-family:monospace');
});