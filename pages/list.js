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
      levels = data.sort((a, b) => a.rank - b.rank);
      filtered = levels;
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
        <span style="color:#888;">#${lvl.rank}</span>
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
    <h1 style="font-size:36px; font-weight:800; margin-bottom:15px;">
      ${lvl.name}
    </h1>

    <!-- PACKS -->
    <div style="margin-bottom:12px;">
      ${lvl.packs.map(p => `
        <span style="
          background:#111;
          padding:6px 12px;
          margin-right:6px;
          border-radius:8px;
          font-size:13px;
        ">
          ${p}
        </span>
      `).join("")}
    </div>

    <!-- VIDEO -->
    <iframe width="100%" height="340" src="${lvl.video}" frameborder="0"></iframe>

    <!-- TAGS -->
    <div style="margin-top:10px;">
      ${lvl.tags.map(t => `
        <span style="
          background:#1a1a1a;
          padding:6px 12px;
          margin:5px;
          display:inline-block;
          border-radius:10px;
          font-size:13px;
        ">
          ${t}
        </span>
      `).join("")}
    </div>

    <!-- GRID BİLGİ -->
    <div style="
      margin-top:25px;
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap:25px;
      border-top:1px solid #222;
      padding-top:20px;
    ">

      <div>
        <p style="color:#777; font-size:12px;">LEVEL ID</p>
        <p style="font-size:28px; font-weight:bold;">${lvl.id}</p>
      </div>

      <div>
        <p style="color:#777; font-size:12px;">LIST POINTS</p>
        <p style="font-size:28px; font-weight:bold;">${lvl.points}</p>
      </div>

      <div>
        <p style="color:#777; font-size:12px;">ENJOYMENT</p>
        <p style="font-size:28px; font-weight:bold;">${lvl.enjoyment}</p>
      </div>

      <div>
        <p style="color:#777; font-size:12px;">SONG</p>
        <p style="font-size:22px;">
          ${lvl.song.id}
          <a href="${lvl.song.url}" target="_blank">↗</a>
        </p>
      </div>

      <div>
        <p style="color:#777; font-size:12px;">NLW TIER</p>
        <p style="font-size:22px;">${lvl.nlw}</p>
      </div>

      <div>
        <p style="color:#777; font-size:12px;">GDDL TIER</p>
        <p style="font-size:22px;">${lvl.gddl}</p>
      </div>

    </div>

    <!-- ALT BİLGİ -->
    <div style="margin-top:25px;">

      <p style="color:#777;">PUBLISHER</p>
      <span style="
        background:#111;
        padding:6px 10px;
        border-radius:8px;
        display:inline-block;
      ">
        ${lvl.publisher}
      </span>

      <p style="color:#777; margin-top:12px;">VERIFIER</p>
      <span style="
        background:#111;
        padding:6px 10px;
        border-radius:8px;
        display:inline-block;
      ">
        ${lvl.verifier}
      </span>

      <p style="color:#777; margin-top:12px;">CREATORS</p>
      <div style="margin-top:6px;">
        ${lvl.creators.map(c => `
          <span style="
            background:#111;
            padding:6px 10px;
            margin:4px;
            display:inline-block;
            border-radius:8px;
            font-size:13px;
          ">
            ${c}
          </span>
        `).join("")}
      </div>

    </div>
  `;

  renderRecords(lvl.records);
}

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
