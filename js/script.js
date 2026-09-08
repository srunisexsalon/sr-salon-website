'use strict';

/* ============================================================
   SR UNISEX SALON - MAIN SCRIPT
   Lightweight & Performance Optimized
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('hamburger-icon');

    /* --------------------------------------------------------
       Mobile Menu
       -------------------------------------------------------- */

    if (!menuButton || !mobileMenu) return;

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');

        menuButton.setAttribute('aria-expanded', 'true');

        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    };

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');

        menuButton.setAttribute('aria-expanded', 'false');

        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    };

    const toggleMenu = () => {
        const isOpen =
            menuButton.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    /* --------------------------------------------------------
       Accessibility
       -------------------------------------------------------- */

    menuButton.type = 'button';
    menuButton.setAttribute(
        'aria-label',
        'Toggle mobile navigation menu'
    );
    menuButton.setAttribute(
        'aria-controls',
        'mobile-menu'
    );
    menuButton.setAttribute(
        'aria-expanded',
        'false'
    );

    /* --------------------------------------------------------
       Menu Button
       -------------------------------------------------------- */

    menuButton.addEventListener('click', toggleMenu);

    /* --------------------------------------------------------
       Close Menu When Navigation Link Is Clicked
       -------------------------------------------------------- */

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const serviceList = document.getElementById('service-list');
    const serviceListToggle = document.getElementById('service-list-toggle');

    if (serviceList && serviceListToggle) {
        serviceListToggle.addEventListener('click', () => {
            const isExpanded = serviceListToggle.getAttribute('aria-expanded') === 'true';
            const toggleIcon = serviceListToggle.querySelector('i');

            serviceList.classList.toggle('service-list-collapsed', isExpanded);
            serviceListToggle.setAttribute('aria-expanded', String(!isExpanded));
            serviceListToggle.firstChild.textContent = isExpanded
                ? 'Show more services'
                : 'Show fewer services';

            if (toggleIcon) {
                toggleIcon.classList.toggle('fa-chevron-up', !isExpanded);
                toggleIcon.classList.toggle('fa-chevron-down', isExpanded);
            }
        });
    }

    const gallery = document.getElementById('gallery');

    if (gallery) {
        gallery.querySelectorAll('.aspect-square > img').forEach((image, index) => {
            const tile = image.parentElement;
            const link = document.createElement('a');

            link.href = image.src;
            link.target = '_blank';
            link.rel = 'noopener';
            link.className = `${tile.className} gallery-item`;
            link.setAttribute('aria-label', `View gallery image ${index + 1}: ${image.alt}`);
            link.appendChild(image);
            tile.replaceWith(link);
        });
    }

    /* --------------------------------------------------------
       Close Menu With Escape Key
       -------------------------------------------------------- */

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
});