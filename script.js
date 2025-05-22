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
