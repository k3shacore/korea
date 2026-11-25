// Серая заглушка вместо фото. Чтобы вставить настоящее фото, замените src у нужного img.
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#dfe6ee'/></svg>"
);
document.querySelectorAll("img[data-ph]").forEach(function (img) {
  img.src = PLACEHOLDER;
  img.loading = "lazy";
});

// Плавная прокрутка к разделу с учётом высоты навбара
const navHeight = 70;
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    const id = link.getAttribute("href");
    const target = id.length > 1 ? document.querySelector(id) : document.body;
    if (!target) return;
    e.preventDefault();
    const top = id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: top, behavior: "smooth" });
    // Закрываем мобильное меню после выбора пункта
    const menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// Кнопка "наверх" появляется после прокрутки
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", function () {
  toTop.classList.toggle("show", window.scrollY > 400);
});
toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Простая проверка формы без отправки на сервер
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  success.classList.add("d-none");
  let valid = true;
  form.querySelectorAll("input, textarea").forEach(function (field) {
    const ok = field.checkValidity();
    field.classList.toggle("is-invalid", !ok);
    field.classList.toggle("is-valid", ok);
    if (!ok) valid = false;
  });
  if (valid) {
    success.classList.remove("d-none");
    form.reset();
    form.querySelectorAll(".is-valid").forEach(function (f) { f.classList.remove("is-valid"); });
  }
});
