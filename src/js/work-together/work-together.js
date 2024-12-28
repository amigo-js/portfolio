import emailjs from "emailjs-com";
import iziToast from "izitoast";

export function initWorkTogetherSection() {
  const elms = {
    form: document.querySelector(".footer-form"),
    email: document.querySelector(".footer-email-input"),
    successLabel: document.querySelector(".text-valid"),
    errorLabel: document.querySelector(".text-invalid"),
    comments: document.querySelector(".footer-comments-input"),
    btn: document.querySelector(".footer-send-button"),
    modalBackdrop: document.querySelector(".footer-modal-backdrop"),
    modalOverlay: document.querySelector(".footer-modal-overlay"),
    modalTitle: document.querySelector(".footer-modal-title"),
    modalMessage: document.querySelector(".footer-modal-description"),
    closeModalButton: document.querySelector(".footer-modal-close-button"),
  };

  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS environment variables are missing.");
    return;
  }

  const modals = {
    open(title, message) {
      elms.modalTitle.textContent = title;
      elms.modalMessage.textContent = message;

      elms.modalBackdrop.classList.remove("visually-hidden");
      elms.modalOverlay.classList.remove("visually-hidden");
      elms.modalBackdrop.classList.add("is-open");
      elms.modalOverlay.classList.add("is-open");

      elms.closeModalButton.addEventListener("click", modals.close);
      elms.modalBackdrop.addEventListener("click", onBackdropClick);
      document.body.addEventListener("keydown", onBodyPress);
    },

    close() {
      elms.modalOverlay.classList.remove("is-open");
      elms.modalBackdrop.classList.remove("is-open");

      setTimeout(() => {
        elms.modalBackdrop.classList.add("visually-hidden");
        elms.modalOverlay.classList.add("visually-hidden");
      }, 500);

      elms.modalTitle.textContent = "";
      elms.modalMessage.textContent = "";

      elms.closeModalButton.removeEventListener("click", modals.close);
      elms.modalBackdrop.removeEventListener("click", onBackdropClick);
      document.body.removeEventListener("keydown", onBodyPress);
    },
  };

  const onBackdropClick = (event) => {
    if (event.target === elms.modalBackdrop) {
      modals.close();
    }
  };

  const onBodyPress = (event) => {
    if (event.key === "Escape") {
      modals.close();
    }
  };

  const isValidEmail = (email) => {
    const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email.trim());
  };

  elms.form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = elms.email.value.trim();
    const comments = elms.comments.value.trim();

    if (!email || !comments) {
      iziToast.error({ title: "Error", message: "All fields are required." });
      return;
    }

    if (!isValidEmail(email)) {
      iziToast.error({ title: "Error", message: "Invalid email address." });
      return;
    }

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: email,
          message: comments,
          to_name: "Vito",
        },
        publicKey
      );

      if (response.status === 200) {
        iziToast.success({
          title: "Success",
          message: "Your message has been sent successfully!",
        });

        modals.open(
          "Thank you for your interest in cooperation!",
          "I will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch."
        );

        elms.form.reset();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      iziToast.error({
        title: "Error",
        message: "Failed to send your message.",
      });
    }
  });
}
