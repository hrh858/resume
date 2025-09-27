import "./styles.css";

console.log(
  "%c🍊 Hola! It's Jorge here — if you found your way here, I think we've got some topics in common!",
  "color: #f97316; font-size: 14px; font-weight: bold;"
);

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy-email]");

  copyButtons.forEach((button) => {
    const email = button.getAttribute("data-copy-value");
    if (!email) return;

    const defaultIcon = button.textContent;

    const showFeedback = (icon) => {
      button.textContent = icon;
      setTimeout(() => {
        button.textContent = defaultIcon;
      }, 1500);
    };

    button.addEventListener("click", async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const temp = document.createElement("textarea");
          temp.value = email;
          temp.setAttribute("readonly", "");
          temp.style.position = "absolute";
          temp.style.opacity = "0";
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
        }
        showFeedback("✅");
      } catch (error) {
        console.error("Failed to copy email", error);
        showFeedback("⚠️");
      }
    });
  });
});
