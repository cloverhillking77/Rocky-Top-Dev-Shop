const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll("[required]")];
  const invalidField = fields.find((field) => !field.checkValidity());

  fields.forEach((field) => {
    field.setAttribute("aria-invalid", String(!field.checkValidity()));
  });

  if (invalidField) {
    formStatus.textContent = "Please complete each field with valid information.";
    invalidField.focus();
    return;
  }

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Project inquiry: ${formData.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nService: ${formData.get("service")}\n\nProject details:\n${formData.get("message")}`
  );

  formStatus.textContent = "Opening your email app with the project details ready to send.";
  window.location.href = `mailto:hello@rockytopdevshop.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll(".contact-form input, .contact-form select, .contact-form textarea").forEach((field) => {
  field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
});

document.querySelector("#year").textContent = new Date().getFullYear();
