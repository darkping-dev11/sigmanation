export default function Uyeler() {
  setTimeout(initUyeler, 0);

  return `
  <div style="padding:40px; max-width:1200px; margin:auto;">

    <h1 style="font-size:32px; font-weight:bold; margin-bottom:20px;">
      Üyeler
    </h1>

    <div id="uyeList"
      style="
        display:grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap:20px;
      ">
    </div>

  </div>
  `;
}

let uyeler = [];

function initUyeler() {
  fetch("uyeler.json")
    .then(res => res.json())
    .then(data => {
      uyeler = data;
      renderUyeler();
    });
}

function renderUyeler() {
  const container = document.getElementById("uyeList");
  container.innerHTML = "";

  uyeler.forEach(uye => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 15px;
        display:flex;
        align-items:center;
        gap:12px;
        transition:0.2s;
      ">

        <!-- PROFİL RESMİ -->
        <img src="${uye.avatar}" 
          style="
            width:50px;
            height:50px;
            border-radius:50%;
            object-fit:cover;
          ">

        <!-- BİLGİ -->
        <div style="flex:1;">
          <div style="font-size:16px; font-weight:bold;">
            ${uye.name}
          </div>

          <div style="font-size:13px; color:#888;">
            @${uye.username}
          </div>

          <!-- ROL -->
          <div style="margin-top:6px;">
            <span style="
              background:#1f2937;
              padding:3px 8px;
              border-radius:6px;
              font-size:12px;
              color:#ccc;
            ">
              ${uye.role}
            </span>
          </div>
        </div>

      </div>
    `;

    container.appendChild(div);
  });
}
