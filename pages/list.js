export default function List() {
  setTimeout(initList, 0);

  return `
    <div style="display:flex; height:100vh;">

      <!-- SOL -->
      <div id="levelList" style="width:25%; background:#111; overflow-y:auto;"></div>

      <!-- ORTA -->
      <div id="levelDetail" style="width:50%; padding:20px;"></div>

      <!-- SAĞ -->
      <div id="records" style="width:25%; background:#111; overflow-y:auto;"></div>

    </div>
  `;
}

let levels = [];
let selected = 0;

function initList() {
  fetch("levels.json")
    .then(res => res.json())
    .then(data => {
      levels = data;
      renderList();
      renderLevel(0);
    });
}

function renderList() {
  const list = document.getElementById("levelList");
  list.innerHTML = "";

  levels.forEach((lvl, i) => {
    const div = document.createElement("div");

    div.innerHTML = `#${i+1} ${lvl.name}`;
    div.style.padding = "12px";
    div.style.borderBottom = "1px solid #222";
    div.style.cursor = "pointer";

    if (i === selected) div.style.background = "#333";

    div.onclick = () => {
      selected = i;
      renderList();
      renderLevel(i);
    };

    list.appendChild(div);
  });
}

function renderLevel(i) {
  const lvl = levels[i];
  const box = document.getElementById("levelDetail");

  box.innerHTML = `
    <h1 style="font-size:30px;">${lvl.name}</h1>

    <iframe width="100%" height="300" src="${lvl.video}"></iframe>

    <p>ID: ${lvl.id}</p>
    <p>Publisher: ${lvl.publisher}</p>
    <p>Verifier: ${lvl.verifier}</p>

    <div>
      ${lvl.tags.map(t => `<span style="background:#222;padding:5px;margin:5px;">${t}</span>`).join("")}
    </div>
  `;

  renderRecords(lvl.records);
}

function renderRecords(records) {
  const box = document.getElementById("records");
  box.innerHTML = "<h3 style='padding:10px;'>Records</h3>";

  records.forEach(r => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p style="padding:10px;">${r.name}</p>
    `;

    box.appendChild(div);
  });
}
