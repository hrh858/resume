import "./styles.css";

const root = document.documentElement;
const STORAGE_KEY = "theme";
const VALID_THEMES = new Set(["light", "dark"]);

const getStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return VALID_THEMES.has(stored) ? stored : null;
  } catch (error) {
    return null;
  }
};

const getSystemTheme = () => {
  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

const updateToggleButtons = (theme) => {
  const isDark = theme === "dark";
  const emoji = isDark ? "☀️" : "🌙";
  const label = isDark ? "☀️ Light mode" : "🌙 Dark mode";
  const description = isDark ? "Switch to light color theme" : "Switch to dark color theme";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.querySelectorAll("[data-theme-toggle-label]").forEach((node) => {
      node.textContent = label;
    });

    const emojiSpan = button.querySelector("span[aria-hidden='true']");
    if (emojiSpan) {
      emojiSpan.textContent = emoji;
    }

    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", description);
    button.setAttribute("title", label);
  });
};

const applyTheme = (theme, { persist = true } = {}) => {
  const nextTheme = VALID_THEMES.has(theme) ? theme : "light";
  root.dataset.theme = nextTheme;

  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      // localStorage might be unavailable; ignore.
    }
  }

  updateToggleButtons(nextTheme);
};

const initThemeToggle = () => {
  const storedTheme = getStoredTheme();
  const initialTheme = storedTheme ?? root.dataset.theme ?? getSystemTheme();
  applyTheme(initialTheme, { persist: Boolean(storedTheme) });

  const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (mediaQuery) {
    const handlePreferenceChange = (event) => {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? "dark" : "light", { persist: false });
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handlePreferenceChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handlePreferenceChange);
    }
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });
};

console.log(
  "%c🍊 Hola! It's Jorge here — if you found your way here, I think we've got some topics in common!",
  "color: #f97316; font-size: 14px; font-weight: bold;"
);

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();

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
