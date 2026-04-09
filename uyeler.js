export default function Members() {
  return `
  <div style="padding:30px; max-width:1100px; margin:auto;">

    <h1 style="font-size:32px; font-weight:bold; margin-bottom:20px;">
      Members
    </h1>

    <div style="
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
      gap:20px;
    ">

      ${users.map(u => `
        <div style="
          background:#111;
          border:1px solid #222;
          border-radius:14px;
          padding:15px;
          display:flex;
          align-items:center;
          gap:12px;
          transition:0.2s;
        "
        onmouseover="this.style.transform='scale(1.03)'"
        onmouseout="this.style.transform='scale(1)'"
        >

          <!-- AVATAR -->
          <img src="${u.avatar}" style="
            width:45px;
            height:45px;
            border-radius:50%;
          ">

          <!-- INFO -->
          <div>
            <div style="font-size:16px; font-weight:bold;">
              ${u.name}
            </div>

            <div style="font-size:13px; color:#888;">
              @${u.username}
            </div>

            <div style="
              margin-top:5px;
              font-size:11px;
              background:#222;
              display:inline-block;
              padding:3px 8px;
              border-radius:6px;
            ">
              ${u.role}
            </div>

          </div>

        </div>
      `).join("")}

    </div>

  </div>
  `;
}

const users = [
  {
    name: "darkping",
    username: "darkping",
    role: "Owner",
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "Notar",
    username: "notar",
    role: "Owner",
    avatar: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Draconis",
    username: "draconis",
    role: "Owner",
    avatar: "https://i.pravatar.cc/100?img=3"
  },
  {
    name: "Developer1",
    username: "dev1",
    role: "Developer",
    avatar: "https://i.pravatar.cc/100?img=4"
  },
  {
    name: "Moderator1",
    username: "mod1",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/100?img=5"
  }
];
