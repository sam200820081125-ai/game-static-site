const svgImage = (title, c1, c2, symbol) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="1200" height="750" fill="url(#g)"/>
    <circle cx="940" cy="170" r="210" fill="white" opacity=".08"/>
    <circle cx="170" cy="610" r="270" fill="black" opacity=".15"/>
    <text x="80" y="130" fill="white" opacity=".72" font-size="34" font-family="Arial" letter-spacing="8">GAME//VAULT</text>
    <text x="80" y="450" fill="white" font-size="170" font-family="Arial" font-weight="700">${symbol}</text>
    <text x="80" y="570" fill="white" font-size="72" font-family="Arial" font-weight="700">${title}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const games = [
  {
    id: "neon-odyssey",
    title: "霓虹遠征 Neon Odyssey",
    category: "adventure",
    categoryLabel: "冒險",
    year: "2026",
    summary: "穿梭在崩壞的霓虹都市，以探索、跑酷與謎題拼起失落的城市記憶。",
    cover: svgImage("NEON ODYSSEY", "#1f3cff", "#7d1fff", "✦"),
    text: "《霓虹遠征》是一款偏敘事導向的城市冒險概念。玩家需要在不同區域蒐集訊號碎片，逐步解鎖人物關係、隱藏路線與城市真相。",
    images: [
      svgImage("CITY SECTOR 07", "#07172f", "#00a5d9", "07"),
      svgImage("MEMORY GATE", "#341b5f", "#c237ff", "◇")
    ],
    video: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    html: "demo-neon.html",
    slides: "https://docs.google.com/presentation/"
  },
  {
    id: "kingdom-grid",
    title: "王國棋局 Kingdom Grid",
    category: "strategy",
    categoryLabel: "策略",
    year: "2026",
    summary: "把王國經營壓縮成一張棋盤：每一步都會改變資源、外交與戰線。",
    cover: svgImage("KINGDOM GRID", "#204536", "#94c35b", "♜"),
    text: "這是一款回合制策略原型。玩家每回合只能進行有限次行動，必須在擴張領土、鞏固經濟與維持外交之間做出取捨。",
    images: [
      svgImage("TACTICAL MAP", "#12241b", "#558b45", "⌗"),
      svgImage("WAR ROOM", "#3f301e", "#b17d3c", "♞")
    ],
    video: "",
    html: "demo-grid.html",
    slides: "https://docs.google.com/presentation/"
  },
  {
    id: "orbit-rush",
    title: "軌道暴走 Orbit Rush",
    category: "arcade",
    categoryLabel: "街機",
    year: "2026",
    summary: "一分鐘一局的高速街機挑戰，利用引力甩尾穿越愈來愈危險的軌道。",
    cover: svgImage("ORBIT RUSH", "#ea3f2c", "#ffb62e", "◎"),
    text: "《軌道暴走》主打快速重玩與分數挑戰。操作只有左右推進與短暫加速，但軌道會不停改變，引導玩家用節奏與風險換取更高倍率。",
    images: [
      svgImage("SPEED LOOP", "#5f130f", "#f05224", "×8"),
      svgImage("GRAVITY BREAK", "#48220b", "#ffac21", "↻")
    ],
    video: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ",
    html: "demo-orbit.html",
    slides: ""
  }
];

const mediaLabels = {
  text: "文字",
  images: "圖片",
  video: "影片",
  html: "HTML 作品",
  slides: "簡報"
};

const grid = document.querySelector("#game-grid");
const dialog = document.querySelector("#game-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector(".dialog-close");
const filterButtons = document.querySelectorAll(".filter-button");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function getAvailableMedia(game) {
  return Object.entries(mediaLabels)
    .filter(([key]) => Array.isArray(game[key]) ? game[key].length : Boolean(game[key]))
    .map(([, label]) => label);
}

function renderGames(filter = "all") {
  const visibleGames = filter === "all" ? games : games.filter(game => game.category === filter);
  grid.innerHTML = visibleGames.map((game, index) => `
    <article class="game-card">
      <div class="game-art">
        <img src="${game.cover}" alt="${game.title} 封面圖" />
        <span class="game-number">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="game-body">
        <div class="game-meta"><span>${game.categoryLabel}</span><span>${game.year}</span></div>
        <h3>${game.title}</h3>
        <p>${game.summary}</p>
        <div class="media-tags">
          ${getAvailableMedia(game).map(label => `<span class="media-tag">${label}</span>`).join("")}
        </div>
        <button class="card-button" data-open-game="${game.id}">查看完整條目</button>
      </div>
    </article>
  `).join("");
}

function openGame(id) {
  const game = games.find(item => item.id === id);
  if (!game) return;

  dialogContent.innerHTML = `
    <div class="dialog-inner">
      <div class="dialog-hero"><img src="${game.cover}" alt="${game.title} 封面圖"></div>
      <p class="eyebrow">${game.categoryLabel.toUpperCase()} · ${game.year}</p>
      <h2>${game.title}</h2>
      <p class="dialog-summary">${game.summary}</p>

      ${game.text ? `<section class="content-block"><h3>文字介紹</h3><p>${game.text}</p></section>` : ""}
      ${game.images?.length ? `<section class="content-block"><h3>圖片</h3><div class="gallery">${game.images.map((image, index) => `<img src="${image}" alt="${game.title} 圖片 ${index + 1}">`).join("")}</div></section>` : ""}
      ${game.video ? `<section class="content-block"><h3>影片</h3><iframe class="video-frame" src="${game.video}" title="${game.title} 影片" loading="lazy" allowfullscreen></iframe></section>` : ""}
      ${game.html ? `<section class="content-block"><h3>HTML 作品</h3><iframe class="html-frame" src="${game.html}" title="${game.title} HTML 作品"></iframe><a class="resource-link" href="${game.html}" target="_blank" rel="noopener">另開作品</a></section>` : ""}
      ${game.slides ? `<section class="content-block"><h3>簡報</h3><p>可將 Google Slides、PowerPoint Online 或自行匯出的簡報頁面連結放在此處。</p><a class="resource-link" href="${game.slides}" target="_blank" rel="noopener">開啟簡報</a></section>` : ""}
    </div>
  `;
  dialog.showModal();
}

renderGames();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderGames(button.dataset.filter);
  });
});

grid.addEventListener("click", event => {
  const trigger = event.target.closest("[data-open-game]");
  if (trigger) openGame(trigger.dataset.openGame);
});

closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", () => {
  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});
