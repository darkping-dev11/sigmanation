import Home from './pages/home.js'
import List from './pages/list.js'

// Sayfa alanı
const app = document.getElementById("app");

// Sayfalar
const routes = {
  home: Home,
  list: List
};

// Sayfa render
function render(page) {
  const Page = routes[page];

  if (!Page) {
    app.innerHTML = "<h1 style='padding:40px'>Sayfa bulunamadı</h1>";
    return;
  }

  app.innerHTML = Page();
}

// Navbar click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const page = link.dataset.page;
    render(page);
  });
});

// İlk açılış
render("home");
