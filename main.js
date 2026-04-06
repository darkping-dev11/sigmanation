import List from './pages/list.js'

const app = document.getElementById("app");

// SADECE JS SAYFALAR
const routes = {
  list: List
};

function render(page) {

  // 👉 HOME ise eski haline dön
  if (page === "home") {
    location.reload(); // sayfayı yeniler, ana sayfa geri gelir
    return;
  }

  const Page = routes[page];

  if (!Page) {
    app.innerHTML = "<h1 style='padding:40px'>Sayfa yok</h1>";
    return;
  }

  app.innerHTML = Page();
}

// NAVBAR
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const page = link.dataset.page;
    render(page);
  });
});
