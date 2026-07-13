/* ==========================================
   ARYA FILMS
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initNavbar();
    initScrollAnimation();
    initSmoothScroll();
    initActiveNav();
    initGalleryLightbox();

});

/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuToggle.innerHTML = "✖";
        } else {
            menuToggle.innerHTML = "☰";
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.innerHTML = "☰";

        });

    });

}

/* ==========================================
   STICKY NAVBAR
========================================== */

function initNavbar() {

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            nav.classList.add("scrolled");

        } else {

            nav.classList.remove("scrolled");

        }

    });

}

/* ==========================================
   FADE-UP ANIMATION
========================================== */

function initScrollAnimation() {

    const elements = document.querySelectorAll(
        ".card, .gallery img, section h2, section p"
    );

    elements.forEach(el => {

        el.classList.add("fade-up");

    });

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

function initActiveNav() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.clientHeight;

            if (window.scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================================
   IMAGE LIGHTBOX
========================================== */

function initGalleryLightbox() {

    const images = document.querySelectorAll(".gallery img");

    if (!images.length) return;

    const overlay = document.createElement("div");
    overlay.id = "lightbox";

    overlay.innerHTML = `
        <span id="closeLightbox">&times;</span>
        <img id="lightboxImg">
    `;

    document.body.appendChild(overlay);

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

    images.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        });

    });

    closeBtn.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            lightbox.style.display = "none";

        }

    });

}
