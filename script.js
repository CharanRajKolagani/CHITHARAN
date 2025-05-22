// document.addEventListener("DOMContentLoaded", function () {
//     // Mobile navigation toggle
//     const navToggle = document.createElement("button");
//     navToggle.textContent = "☰ Menu";
//     navToggle.style.display = "none";
//     navToggle.style.padding = "10px";
//     navToggle.style.background = "#222";
//     navToggle.style.color = "white";
//     navToggle.style.border = "none";
//     navToggle.style.cursor = "pointer";
//     navToggle.style.marginBottom = "10px";

//     const nav = document.querySelector("nav");
//     nav.insertAdjacentElement("beforebegin", navToggle);

//     navToggle.addEventListener("click", function () {
//         nav.classList.toggle("visible");
//     });

//     function checkScreenSize() {
//         if (window.innerWidth < 768) {
//             navToggle.style.display = "block";
//             nav.style.display = "none";
//         } else {
//             navToggle.style.display = "none";
//             nav.style.display = "flex";
//         }
//     }

//     window.addEventListener("resize", checkScreenSize);
//     checkScreenSize();

//     // Smooth scrolling within the same page
//     document.querySelectorAll('nav a').forEach(link => {
//         link.addEventListener("click", function (event) {
//             event.preventDefault();
//             const targetId = this.getAttribute("href");

//             if (targetId.startsWith("#")) {
//                 // Navigate within the same page
//                 const targetElement = document.querySelector(targetId);
//                 if (targetElement) {
//                     targetElement.scrollIntoView({ behavior: "smooth" });
//                 }
//             } else {
//                 // Redirect to index.html and scroll to the section
//                 window.location.href = `${targetId}`;
//             }
//         });
//     });

//     // Form validation
//     const contactForm = document.querySelector("form");
//     if (contactForm) {
//         contactForm.addEventListener("submit", function (event) {
//             event.preventDefault();

//             const name = document.querySelector("input[name='name']").value.trim();
//             const email = document.querySelector("input[name='email']").value.trim();
//             const message = document.querySelector("textarea[name='message']").value.trim();

//             if (name === "" || email === "" || message === "") {
//                 alert("Please fill in all fields.");
//                 return;
//             }

//             if (!validateEmail(email)) {
//                 alert("Please enter a valid email address.");
//                 return;
//             }

//             alert("Your message has been sent successfully!");
//             contactForm.reset();
//         });
//     }

//     function validateEmail(email) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }

//     // Image hover effect
//     const categoryImages = document.querySelectorAll(".category img");
//     categoryImages.forEach((img) => {
//         img.addEventListener("mouseover", function () {
//             img.style.transform = "scale(1.05)";
//             img.style.transition = "0.3s ease-in-out";
//         });

//         img.addEventListener("mouseout", function () {
//             img.style.transform = "scale(1)";
//         });
//     });

//     document.querySelectorAll('.social-icons a').forEach(icon => {
//         icon.addEventListener('click', () => {
//             alert('You clicked a social media icon!');
//         });
//     });

   
// });

// --- Booking Slot Logic ---
const slotsPerDay = [
    "09:00 AM - 11:00 AM",
    "12:00 PM - 02:00 PM",
    "03:00 PM - 05:00 PM",
    "06:00 PM - 08:00 PM"
];

// Simulated backend slot data (replace with real backend calls)
let bookedSlots = {}; // { "2025-05-23": ["09:00 AM - 11:00 AM", ...] }

function setMinDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('booking-date').min = `${yyyy}-${mm}-${dd}`;
}
setMinDate();

document.getElementById('booking-date').addEventListener('change', function() {
    const date = this.value;
    const slotSelect = document.getElementById('booking-slot');
    slotSelect.innerHTML = '<option value="">Select a slot</option>';
    if (!date) return;
    // Simulate fetching booked slots from backend
    const taken = bookedSlots[date] || [];
    slotsPerDay.forEach(slot => {
        const disabled = taken.includes(slot) ? 'disabled' : '';
        slotSelect.innerHTML += `<option value="${slot}" ${disabled}>${slot}${disabled ? ' (Booked)' : ''}</option>`;
    });
});

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('booking-date').value;
    const slot = document.getElementById('booking-slot').value;
    const name = this.name.value;
    const email = this.email.value;
    const details = this.details.value;
    const msg = document.getElementById('booking-message');
    if (!date || !slot) {
        msg.textContent = "Please select a date and slot.";
        msg.style.color = "red";
        return;
    }
    // Simulate backend booking
    if (!bookedSlots[date]) bookedSlots[date] = [];
    if (bookedSlots[date].includes(slot)) {
        msg.textContent = "Sorry, this slot is already booked.";
        msg.style.color = "red";
        return;
    }
    bookedSlots[date].push(slot);
    msg.textContent = "Booking successful! We'll contact you soon.";
    msg.style.color = "green";
    this.reset();
    document.getElementById('booking-slot').innerHTML = '<option value="">Select a slot</option>';
});

// For backend: Replace the above booking logic with an AJAX/fetch POST to your server
// Example:
/*
fetch('/api/book-slot', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, date, slot, details})
})
.then(res => res.json())
.then(data => { ... });
*/

// Hero-right toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const heroToggleBtn = document.querySelector('.hero-toggle-btn');
    const heroRight = document.querySelector('.hero-right');
    const heroLeft = document.querySelector('.hero-left');
    if (heroToggleBtn && heroRight && heroLeft) {
        heroToggleBtn.addEventListener('click', function() {
            heroRight.classList.toggle('active');
            // Hide hero-left when active, show when not
            if (heroRight.classList.contains('active')) {
                heroLeft.classList.add('hide');
            } else {
                heroLeft.classList.remove('hide');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    const mainNav = document.querySelector('.main-nav');
    let justToggled = false;

    // Open/close menu on button click
    if (menuToggle && headerMenu && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            headerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
            justToggled = true;
            setTimeout(() => { justToggled = false; }, 100); // Prevent immediate close
        });
    }

    // Function to close menu
    function closeMenu(e) {
        if (
            headerMenu &&
            headerMenu.classList.contains('active') &&
            !headerMenu.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            !justToggled
        ) {
            headerMenu.classList.remove('active');
            mainNav.classList.remove('active');
        }
    }

    // Close menu on click or touch anywhere outside
    document.addEventListener('click', closeMenu);
    document.addEventListener('touchstart', closeMenu);

    // Optional: Close menu when a menu link is clicked
    if (headerMenu) {
        headerMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                headerMenu.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }
});
