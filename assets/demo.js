const root = document.documentElement;
const pageLabel = document.getElementById("page-label");
const modal = document.getElementById("demo-modal");
const toast = document.getElementById("demo-toast");
let toastTimer;

function icon(name) {
  return '<svg aria-hidden="true"><use href="assets/icons.svg#icon-' + name + '"></use></svg>';
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("waqaar-ui-theme", theme);
  const dark = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const nextIcon = dark ? "sun" : "moon";
  const action = dark ? "Switch to light theme" : "Switch to dark theme";
  document.querySelectorAll(".theme-button").forEach((button) => {
    const label = button.querySelector("span");
    button.innerHTML = icon(nextIcon) + (label ? "<span>" + action + "</span>" : "");
    button.setAttribute("aria-label", action);
  });
}

function cycleTheme() {
  const current = root.dataset.theme;
  const dark = current === "dark" || (current === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  applyTheme(dark ? "light" : "dark");
}

function navigate(view) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  pageLabel.textContent = view.charAt(0).toUpperCase() + view.slice(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message = "Example action completed.") {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2400);
}

function openModal() {
  modal.classList.remove("hidden");
  document.getElementById("modal-input").focus();
}

function closeModal() {
  modal.classList.add("hidden");
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.view));
});
document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.viewJump));
});
document.querySelectorAll(".theme-button").forEach((button) => button.addEventListener("click", cycleTheme));
document.querySelectorAll("[data-demo-toast]").forEach((button) => button.addEventListener("click", () => showToast()));
document.querySelectorAll("[data-demo-modal]").forEach((button) => button.addEventListener("click", openModal));
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector("[data-modal-cancel]").addEventListener("click", closeModal);
document.querySelector("[data-modal-save]").addEventListener("click", () => {
  closeModal();
  showToast("Modal example saved.");
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

document.getElementById("demo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Form example saved.");
});

document.getElementById("demo-compose").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.elements.message;
  const message = input.value.trim();
  if (!message) return;
  const row = document.createElement("div");
  row.className = "message-row mine";
  row.innerHTML = '<div class="bubble-wrap"><div class="bubble"></div><div class="message-meta">Now · Sent</div></div>';
  row.querySelector(".bubble").textContent = message;
  document.getElementById("demo-messages").appendChild(row);
  input.value = "";
  row.scrollIntoView({ behavior: "smooth", block: "end" });
});

applyTheme(localStorage.getItem("waqaar-ui-theme") || "system");

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
