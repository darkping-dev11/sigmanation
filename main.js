import List from './pages/list.js'
import Uyeler from "./uyeler.js";

const app = document.getElementById("app");


const routes = {
  list: List,
  uyeler: Uyeler
};

function render(page) {

  if (page === "home") {
    location.reload(); 
    return;
  }

  const Page = routes[page];

  if (!Page) {
    app.innerHTML = "<h1 style='padding:40px'>Sayfa yok</h1>";
    return;
  }

  app.innerHTML = Page();
}


document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const page = link.dataset.page;
    render(page);
  });
});
