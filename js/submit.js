document.addEventListener("DOMContentLoaded", () => {
  const endpoint =
    "https://nodejs-serverless-function-express-mu-three-16.vercel.app/api/submit";

  // Attach one handler for all forms with .contact-form
  document.querySelectorAll("form.contact-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log("AJAX handler triggered for:", form.id);

      const formData = new URLSearchParams(new FormData(form));

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        const resultText = await response.text();
        if (!response.ok) throw new Error(resultText);

        // Success modal
        showSuccessModal(
          resultText || "Ihre Nachricht wurde erfolgreich gesendet!"
        );

        form.reset();
      } catch (err) {
        console.error("Form submission error:", err);
        showErrorModal("Fehler beim Senden. Bitte versuchen Sie es erneut.");
      }
    });
  });
});

// ✅ Success modal
function showSuccessModal(msg) {
  const modal = document.getElementById("successModal");
  modal.querySelector(".modal-body").textContent = msg;
  modal.style.display = "block";
}

// ✅ Error modal
function showErrorModal(msg) {
  const modal = document.getElementById("errorModal");
  modal.querySelector(".modal-body").textContent = msg;
  modal.style.display = "block";
}

// ✅ Close modals
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.closest(".modal").style.display = "none";
  }
});
