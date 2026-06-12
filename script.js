const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector("#contactForm");
const submitButton = document.querySelector("#submitBtn");
const submitButtonLabel = submitButton?.querySelector(".button-label");
const formStatus = document.querySelector("#formStatus");

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

function showFormStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.scrollIntoView({ behavior: "smooth", block: "center" });
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const endpoint = contactForm.dataset.endpoint?.trim();
  if (!endpoint) {
    showFormStatus("The form is ready, but its delivery endpoint still needs to be connected.", "error");
    return;
  }

  formStatus.className = "form-status";
  formStatus.textContent = "";
  submitButton.disabled = true;
  submitButtonLabel.textContent = "Sending...";

  const data = Object.fromEntries(new FormData(contactForm).entries());

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === "false" || result.success === false) {
      throw new Error(result.message || "Your project inquiry could not be sent. Please email us instead.");
    }

    contactForm.reset();
    showFormStatus("Thanks! We received your project details and will be in touch within two business days.", "success");
  } catch (error) {
    showFormStatus(
      error.message || "Something went wrong. Please email hello@rockytopdevshop.com instead.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
    submitButtonLabel.textContent = "Send project details";
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
