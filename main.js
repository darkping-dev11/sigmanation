import Home from './pages/home.js'
import List from './pages/list.js'
import Ozellikler from './pages/ozellikler.js'

const app = document.getElementById("app");

const routes = {
  home: Home,
  list: List,
  ozellikler: Ozellikler
};

function render(page) {
  const Page = routes[page];
  if (!Page) return;

  app.innerHTML = Page();
}

// NAVBAR CLICK
document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    render(link.dataset.page);
  });
});

// default
render("home");
