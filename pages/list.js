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
    <h1 style="font-size:34px; font-weight:bold; margin-bottom:10px;">
      ${lvl.name}
    </h1>

    <!-- PACKS (VİDEO ÜSTÜ) -->
    <div style="margin-bottom:10px;">
      ${lvl.packs.map(p => `
        <span style="background:#111; padding:6px 12px; margin-right:6px; border-radius:8px; font-size:14px;">
          ${p}
        </span>
      `).join("")}
    </div>

    <!-- VIDEO -->
    <iframe width="100%" height="320" src="${lvl.video}" frameborder="0"></iframe>

    <!-- TAGS (VİDEO ALTI) -->
    <div style="margin-top:10px;">
      ${lvl.tags.map(t => `
        <span style="background:#1a1a1a; padding:6px 12px; margin:5px; display:inline-block; border-radius:10px; font-size:14px;">
          ${t}
        </span>
      `).join("")}
    </div>

    <!-- BİLGİLER -->
    <div style="margin-top:15px; font-size:16px; line-height:1.8; color:#ccc;">
      <p><b>ID:</b> ${lvl.id}</p>
      <p><b>Publisher:</b> ${lvl.publisher}</p>
      <p><b>Verifier:</b> ${lvl.verifier}</p>
      <p><b>Points:</b> ${lvl.points}</p>
      <p><b>Enjoyment:</b> ${lvl.enjoyment}</p>
      <p><b>GDDL:</b> ${lvl.gddl}</p>
      <p><b>NLW:</b> ${lvl.nlw}</p>
    </div>

    <!-- SONG -->
    <div style="margin-top:15px;">
      <b style="font-size:18px;">Song:</b> ${lvl.song.id}
      <a href="${lvl.song.url}" target="_blank"
        style="margin-left:10px; padding:6px 12px; background:#222; border-radius:6px; font-size:14px;">
        ▶
      </a>
    </div>

    <!-- CREATORS -->
    <div style="margin-top:15px;">
      <b style="font-size:18px;">Creators:</b><br>
      <span style="color:#aaa; font-size:15px;">
        ${lvl.creators.join(", ")}
      </span>
    </div>
  `;

  function renderRecords(records) {
  const box = document.getElementById("records");

  box.innerHTML = `
    <h2 style="font-size:26px; font-weight:bold; padding:15px;">
      Records
    </h2>
  `;

  records.forEach(r => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="
        margin:10px;
        padding:12px;
        background:#111;
        border-radius:10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:18px;
      ">
        <span style="font-weight:bold;">${r.name}</span>

        <a href="${r.video}" target="_blank"
          style="background:#222; padding:6px 10px; border-radius:6px;">
          ▶
        </a>
      </div>
    `;

    box.appendChild(div);
  });
}
