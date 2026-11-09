
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


const openButton = document.getElementById("openButton");
const envelopeStage = document.getElementById("envelopeStage");
const opening = document.getElementById("opening");

if (openButton && envelopeStage && opening) {

    openButton.addEventListener("click", () => {

        // Closed invitation changes into open invitation
        envelopeStage.classList.add("is-open");

        // Wait for envelope open + card slide-out animation
        setTimeout(() => {

            // Reveal the main wedding website
            opening.classList.add("opened");

            // Start main page
            document.body.style.overflow = "auto";

        }, 4000);

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
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=85",
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


// 5. AUTOMATIC SCROLL AFTER 7 SECONDS
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

    autoScrollTimer = setTimeout(function () {

        const sections = getSections();

        const currentPosition = window.scrollY;

        const nextSection = sections.find(function (section) {
            return section.getBoundingClientRect().top > 80;
        });

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            startAutoScroll();
        }

    }, 7000);
}


// 6. STOP AUTO SCROLL IF USER SCROLLS
function stopAutoScroll() {

    autoScrollEnabled = false;
    clearTimeout(autoScrollTimer);
}

window.addEventListener("wheel", stopAutoScroll, {
    passive: true
});

window.addEventListener("touchstart", stopAutoScroll, {
    passive: true
});

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


// 7. RSVP WHATSAPP
const rsvpForm = document.getElementById("rsvpForm");

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
