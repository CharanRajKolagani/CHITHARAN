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
    const bookingDateInput = document.getElementById('booking-date');
    if (!bookingDateInput) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
}
setMinDate();

const bookingDateInput = document.getElementById('booking-date');
if (bookingDateInput) {
    bookingDateInput.addEventListener('change', function() {
        const date = this.value;
        const slotSelect = document.getElementById('booking-slot');
        if (!slotSelect) return;
        slotSelect.innerHTML = '<option value="">Select a slot</option>';
        if (!date) return;
        // Simulate fetching booked slots from backend
        const taken = bookedSlots[date] || [];
        slotsPerDay.forEach(slot => {
            const disabled = taken.includes(slot) ? 'disabled' : '';
            slotSelect.innerHTML += `<option value="${slot}" ${disabled}>${slot}${disabled ? ' (Booked)' : ''}</option>`;
        });
    });
}

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
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
}

// Hero-right toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const heroToggleBtn = document.querySelector('.hero-toggle-btn');
    const heroRight = document.querySelector('.hero-right');
    const heroLeft = document.querySelector('.hero-left');
    if (heroToggleBtn && heroRight && heroLeft) {
        heroToggleBtn.addEventListener('click', function() {
            heroRight.classList.toggle('active');
            // Hide hero-left when active, show when not (for mobile and desktop)
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

// Booking Calendar Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Calendar Elements
    const calendarMonth = document.querySelector('.booking-modern-calendar-month span');
    const prevBtn = document.querySelector('.booking-modern-calendar-nav[aria-label="Previous Month"]');
    const nextBtn = document.querySelector('.booking-modern-calendar-nav[aria-label="Next Month"]');
    const calendarDates = document.querySelector('.booking-modern-calendar-dates');
    const dateCells = () => document.querySelectorAll('.booking-modern-calendar-date');
    const timeSlots = document.querySelectorAll('.booking-modern-times label input[type="radio"]');
    const form = document.querySelector('.booking-modern-form');
    const formInputs = form ? form.querySelectorAll('.booking-modern-input') : [];
    const activeClass = 'booking-modern-calendar-date--active';

    // Calendar State
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = today.getDate();
    let selectedMonth = currentMonth;
    let selectedYear = currentYear;

    // Helper: Get days in month
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Helper: Get first day of month (0=Sun)
    function firstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    // Render Calendar
    function renderCalendar(month, year) {
        calendarMonth.textContent = `${today.toLocaleString('default', { month: 'long' })} ${year}`;
        // Use selected month/year for rendering
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        calendarMonth.textContent = `${monthName} ${year}`;
        const days = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);

        // Clear previous dates
        calendarDates.innerHTML = '';

        // Add empty cells for days before 1st
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('span');
            empty.className = 'booking-modern-calendar-date disabled';
            empty.innerHTML = '&nbsp;';
            calendarDates.appendChild(empty);
        }

        // Add days
        for (let d = 1; d <= days; d++) {
            const dayCell = document.createElement('span');
            dayCell.className = 'booking-modern-calendar-date';
            dayCell.textContent = d;

            // Highlight today or selected
            if (
                d === selectedDate &&
                month === selectedMonth &&
                year === selectedYear
            ) {
                dayCell.classList.add(activeClass);
            }
            // Disable past days if current month/year
            if (
                (year < today.getFullYear()) ||
                (year === today.getFullYear() && month < today.getMonth()) ||
                (year === today.getFullYear() && month === today.getMonth() && d < today.getDate())
            ) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', function () {
                    selectedDate = d;
                    selectedMonth = month;
                    selectedYear = year;
                    renderCalendar(month, year);
                });
            }
            calendarDates.appendChild(dayCell);
        }
    }

    // Navigation
    prevBtn.addEventListener('click', function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    nextBtn.addEventListener('click', function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    // Initial Render
    renderCalendar(currentMonth, currentYear);

    // Form Submission (Demo)
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            formInputs.forEach(input => {
                if (!input.value) valid = false;
            });
            if (!valid) {
                alert('Please fill all fields.');
                return;
            }
            const selectedTime = document.querySelector('.booking-modern-times input[type="radio"]:checked');
            alert(
                `Booking Confirmed!\nDate: ${selectedDate} ${new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear}\nTime: ${selectedTime ? selectedTime.parentElement.textContent.trim() : 'N/A'}`
            );
            form.reset();
        });
    }
});
