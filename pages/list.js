export default function List() {
  setTimeout(initList, 0);

  return `
  <div style="display:flex; height:100vh; background:#0a0a0a;">

    <!-- SOL -->
    <div style="width:25%; border-right:1px solid #222; display:flex; flex-direction:column;">

      <!-- SEARCH -->
      <div style="padding:15px; border-bottom:1px solid #222;">
        <input id="search" placeholder="Level Search"
          style="width:100%; padding:10px; background:#111; border:none; color:white; outline:none;">
      </div>

      <!-- LIST -->
      <div id="levelList" style="overflow-y:auto; flex:1;"></div>
    </div>

    <!-- ORTA -->
    <div id="levelDetail" style="width:50%; padding:20px;"></div>

    <!-- SAĞ -->
    <div style="width:25%; border-left:1px solid #222; display:flex; flex-direction:column;">
      <div style="padding:15px; border-bottom:1px solid #222; font-weight:bold;">
        Records
      </div>
      <div id="records" style="overflow-y:auto;"></div>
    </div>

  </div>
  `;
}

let levels = [];
let filtered = [];
let selected = 0;

function initList() {
  fetch("levels.json")
    .then(res => res.json())
    .then(data => {
      levels = data;
      filtered = data;
      renderList();
      renderLevel(0);

      document.getElementById("search").addEventListener("input", e => {
        const val = e.target.value.toLowerCase();
        filtered = levels.filter(l => l.name.toLowerCase().includes(val));
        selected = 0;
        renderList();
        renderLevel(0);
      });
    });
}

function renderList() {
  const list = document.getElementById("levelList");
  list.innerHTML = "";

  filtered.forEach((lvl, i) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="padding:12px; border-bottom:1px solid #1a1a1a;">
        <span style="color:#888;">#${i+1}</span>
        <span style="margin-left:10px;">${lvl.name}</span>
      </div>
    `;

    div.style.cursor = "pointer";

    if (i === selected) div.style.background = "#1f1f1f";

    div.onclick = () => {
      selected = i;
      renderList();
      renderLevel(i);
    };

    list.appendChild(div);
  });
}

function renderLevel(i) {
  const lvl = filtered[i];
  if (!lvl) return;

  const box = document.getElementById("levelDetail");

  box.innerHTML = `
    <h1 style="font-size:28px;">${lvl.name}</h1>

    <iframe width="100%" height="300" src="${lvl.video}" frameborder="0"></iframe>

    <!-- INFO GRID -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:15px; color:#aaa;">

      <div><b>ID:</b> ${lvl.id}</div>
      <div><b>Points:</b> ${lvl.points}</div>

      <div><b>Publisher:</b> ${lvl.publisher}</div>
      <div><b>Enjoyment:</b> ${lvl.enjoyment}</div>

      <div><b>Verifier:</b> ${lvl.verifier}</div>
      <div><b>GDDL:</b> ${lvl.gddl}</div>

      <div><b>NLW:</b> ${lvl.nlw}</div>
    </div>

    <!-- SONG -->
    <div style="margin-top:15px;">
      <b>Song:</b> ${lvl.song.id}
      <a href="${lvl.song.url}" target="_blank"
        style="margin-left:10px; padding:5px 10px; background:#222; border-radius:6px;">
        Open
      </a>
    </div>

    <!-- CREATORS -->
    <div style="margin-top:15px;">
      <b>Creators:</b><br>
      <span style="color:#ccc;">${lvl.creators.join(", ")}</span>
    </div>

    <!-- TAGS -->
    <div style="margin-top:10px;">
      ${lvl.tags.map(t => `
        <span style="background:#1a1a1a; padding:5px 10px; margin:5px; display:inline-block; border-radius:8px;">
          ${t}
        </span>
      `).join("")}
    </div>

    <!-- PACKS -->
    <div style="margin-top:10px;">
      <b>Packs:</b><br>
      ${lvl.packs.map(p => `
        <span style="background:#111; padding:5px 10px; margin:5px; display:inline-block; border-radius:8px;">
          ${p}
        </span>
      `).join("")}
    </div>
  `;

  renderRecords(lvl.records);
}
function renderRecords(records) {
  const box = document.getElementById("records");
  box.innerHTML = "";

  records.forEach(r => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="padding:10px; border-bottom:1px solid #222;">
        <p>${r.name}</p>
      </div>
    `;

    box.appendChild(div);
  });
}
