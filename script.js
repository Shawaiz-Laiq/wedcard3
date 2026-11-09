
/* =========================================
   ADIL & FATIMA WEDDING WEBSITE
   CORRECTED JAVASCRIPT
========================================= */

// 1. OPENING SCREEN
// const openButton = document.getElementById("openButton");
// const opening = document.getElementById("opening");
// const curtains = document.querySelectorAll(".curtain");

// let invitationOpened = false;

// if (openButton) {
//     openButton.addEventListener("click", function () {

//         if (invitationOpened) return;
//         invitationOpened = true;

//         // Opening animation
//         opening.classList.add("opened");

//         // Move curtains
//         curtains.forEach(function (curtain) {
//             curtain.classList.add("open");
//         });

//         // Hide button
//         openButton.classList.add("hide");

//         // Enable body effects
//         document.body.classList.add("invitation-open");

//         // Start butterflies
//         startButterflies();

//         // Start automatic scrolling
//         setTimeout(function () {
//             document.getElementById("invitation")?.scrollIntoView({
//                 behavior: "smooth"
//             });
//         }, 1200);

//         startAutoScroll();
//     });
// }


// const openButton = document.getElementById("openButton");
// const envelopeStage = document.getElementById("envelopeStage");
// const opening = document.getElementById("opening");

// if (openButton && envelopeStage && opening) {

//     openButton.addEventListener("click", () => {

//         // Closed invitation changes into open invitation
//         envelopeStage.classList.add("is-open");

//         // Wait for envelope open + card slide-out animation
//         setTimeout(() => {

//             // Reveal the main wedding website
//             opening.classList.add("opened");

//             // Start main page
//             document.body.style.overflow = "auto";

//         }, 4000);

//     });

// }


/* 1. OPENING SCREEN */

const openButton = document.getElementById("openButton");
const envelopeStage = document.getElementById("envelopeStage");
const opening = document.getElementById("opening");

let invitationOpened = false;

if (openButton && envelopeStage && opening) {

    openButton.addEventListener("click", function () {

        if (invitationOpened) return;

        invitationOpened = true;

        // Closed envelope changes into open envelope
        envelopeStage.classList.add("is-open");

        // Wait for opening animation
        setTimeout(function () {

            // Hide opening screen
            opening.classList.add("opened");

            // Enable website scrolling
            document.body.style.overflow = "auto";

            // Start butterflies and sparkles
            startButterflies();

            // Start automatic scrolling after 7 seconds
            autoScrollEnabled = true;
            startAutoScroll();

        }, 2500);

    });

}


// 2. COUNTDOWN
const weddingDate = new Date(
    "2028-01-01T00:00:00+05:00"
).getTime();

function updateCountdown() {

    const now = Date.now();
    const difference = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (difference <= 0) {
        if (days) days.textContent = "00";
        if (hours) hours.textContent = "00";
        if (minutes) minutes.textContent = "00";
        if (seconds) seconds.textContent = "00";
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const m = Math.floor((difference / (1000 * 60)) % 60);
    const s = Math.floor((difference / 1000) % 60);

    if (days) days.textContent = String(d).padStart(3, "0");
    if (hours) hours.textContent = String(h).padStart(2, "0");
    if (minutes) minutes.textContent = String(m).padStart(2, "0");
    if (seconds) seconds.textContent = String(s).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 3. GALLERY
const galleryImages = [
    "https://i.ibb.co/8Qvhw83/Whats-App-Image-2026-11-09-at-2-57-51-PM.webp",
    "https://i.ibb.co/9HCBwbKG/Whats-App-Image-2026-11-09-at-3-05-56-PM.webp",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    "https://i.ibb.co/LDL8VYVP/Whats-App-Image-2026-11-09-at-3-07-02-PM.webp",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85"
];

let currentImage = 0;

const galleryImage = document.getElementById("galleryImage");
const previousButton = document.getElementById("prevPhoto");
const nextButton = document.getElementById("nextPhoto");
const galleryDots = document.getElementById("galleryDots");
const galleryCaption = document.getElementById("galleryCaption");

function createGalleryDots() {
    if (!galleryDots) return;

    galleryDots.innerHTML = "";

    galleryImages.forEach(function (_, index) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "gallery-dot";
        dot.setAttribute("aria-label", "Show photo " + (index + 1));

        dot.addEventListener("click", function () {
            showGalleryImage(index);
        });

        galleryDots.appendChild(dot);
    });
}

function showGalleryImage(index) {

    if (!galleryImage) return;

    currentImage =
        (index + galleryImages.length) % galleryImages.length;

    galleryImage.style.opacity = "0";

    setTimeout(function () {

        galleryImage.src = galleryImages[currentImage];

        galleryImage.onload = function () {
            galleryImage.style.opacity = "1";
        };

        // Handle already-cached images
        if (galleryImage.complete) {
            galleryImage.style.opacity = "1";
        }

        if (galleryCaption) {
            galleryCaption.textContent =
                "Beautiful Moment " + (currentImage + 1);
        }

        if (galleryDots) {
            const dots = galleryDots.querySelectorAll("button");

            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentImage);
            });
        }

    }, 200);
}

if (galleryImage) {
    galleryImage.style.transition = "opacity 0.4s ease";

    createGalleryDots();
    showGalleryImage(0);

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            showGalleryImage(currentImage - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            showGalleryImage(currentImage + 1);
        });
    }

    // Automatic gallery change
    setInterval(function () {
        showGalleryImage(currentImage + 1);
    }, 5000);
}


// 4. BUTTERFLIES
function startButterflies() {

    const butterflies = document.querySelectorAll(".butterfly");

    butterflies.forEach(function (butterfly) {
        butterfly.classList.add("active");
    });

    // Sparkles
    const sparkles = document.getElementById("sparkles");

    if (sparkles && !sparkles.dataset.started) {

        sparkles.dataset.started = "true";

        for (let i = 0; i < 20; i++) {

            const sparkle = document.createElement("span");

            sparkle.className = "sparkle";
            sparkle.textContent = "✦";

            sparkle.style.left = Math.random() * 100 + "%";
            sparkle.style.top = Math.random() * 100 + "%";
            sparkle.style.animationDelay = Math.random() * 4 + "s";

            sparkles.appendChild(sparkle);
        }
    }
}



/* =========================================
   5. AUTOMATIC SCROLL AFTER 7 SECONDS
========================================= */

let autoScrollTimer;
let autoScrollEnabled = true;

function getSections() {
    return Array.from(
        document.querySelectorAll("main#mainContent section.page")
    );
}

function startAutoScroll() {

    clearTimeout(autoScrollTimer);

    if (!autoScrollEnabled) return;

    // Wait 7 seconds before next scroll
    autoScrollTimer = setTimeout(function () {

        if (!autoScrollEnabled) return;

        const sections = getSections();

        // Find next section below current screen
        const nextSection = sections.find(function (section) {
            return section.getBoundingClientRect().top > 100;
        });

        if (nextSection) {

            nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Wait another 7 seconds for next section
            startAutoScroll();

        }

    }, 7000);
}


/* =========================================
   6. STOP AUTO SCROLL ON USER SCROLL
========================================= */

function stopAutoScroll() {

    if (!autoScrollEnabled) return;

    autoScrollEnabled = false;

    clearTimeout(autoScrollTimer);

    console.log("Automatic scrolling stopped by user.");
}

// Mouse wheel
window.addEventListener("wheel", stopAutoScroll, {
    passive: true
});

// Mobile: actual finger movement, not simple tap
window.addEventListener("touchmove", stopAutoScroll, {
    passive: true
});

// Keyboard scrolling
window.addEventListener("keydown", function (event) {

    const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        " "
    ];

    if (keys.includes(event.key)) {
        stopAutoScroll();
    }

});


// Add host WhatsApp number here.
// Example: 923001234567
const WHATSAPP_NUMBER = "";

if (rsvpForm) {

    rsvpForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("guestName").value.trim();
        const phone = document.getElementById("guestPhone").value.trim();
        const attendance = document.getElementById("attendance").value;
        const guests = document.getElementById("guestCount").value;

        if (!name || !phone || !attendance || !guests) {
            alert("Please fill in all fields.");
            return;
        }

        if (!WHATSAPP_NUMBER) {
            alert("Please add the host WhatsApp number in script.js.");
            return;
        }

        const message =
`Assalam-o-Alaikum!

Wedding RSVP - Adil & Fatima

Name: ${name}
Phone: ${phone}
Attendance: ${attendance}
Number of Guests: ${guests}

Wedding Date: 1 January 2028

Thank you!`;

        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank");
    });
}


// 8. SMOOTH SCROLL LINKS
document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

console.log("Adil & Fatima wedding website JavaScript loaded successfully.");
