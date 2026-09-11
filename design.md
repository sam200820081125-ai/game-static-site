# GAME//VAULT 視覺設計規範

## 1. 設計方向

主題定位為「現代遊戲展示庫 / 數位遊戲檔案館」。整體視覺採深色介面、螢光綠重點色、HUD 資訊元素與大字標題，呈現遊戲平台、開發者作品集與遊戲媒體網站的混合感。

設計關鍵字：`Dark UI`、`Neon`、`HUD`、`Arcade`、`Modular`、`Editorial`。

## 2. 色彩系統

所有主要色彩集中於 `styles.css` 的 `:root` CSS Variables：

- `--bg: #090b10`：網站主背景
- `--surface: #11151d`：卡片與彈窗表面
- `--surface-2: #171c27`：次級表面
- `--line: rgba(255,255,255,.12)`：框線與分隔線
- `--text: #f7f9fc`：主要文字
- `--muted: #9ba5b6`：輔助文字
- `--accent: #a7ff3f`：主要互動與品牌重點色
- `--accent-2: #70e1ff`：次要視覺特效
- `--danger: #ff4f89`：預留警示 / 特殊狀態

新增品牌色時，優先修改變數，不直接散落硬編碼色值。

## 3. 字體

- 中文與內文：`Noto Sans TC`
- 英文標誌 / HUD / 數字：`Space Grotesk`
- 備援：`system-ui, sans-serif`

字級策略：

- Hero H1：`clamp(46px, 7vw, 86px)`
- 區塊 H2：`clamp(34px, 5vw, 54px)`
- 卡片 H3：約 `25px`
- 正文：`16–18px`
- HUD / 標籤：`9–12px`

## 4. 圓角與層級

- 小型控制項：`12px`
- 卡片：`20px`
- 大型視覺容器：`32px`
- Pill / 篩選：`999px`

陰影只用於主要浮層與 Hero 面板，避免所有卡片都產生過重陰影。

## 5. 間距系統

基礎單位約為 `4px / 8px`。常用間距：

- 極小：`8px`
- 小：`12–14px`
- 中：`18–24px`
- 大：`32–40px`
- 區塊：`64–110px`

## 6. 卡片元件規範

遊戲卡片固定包含：

1. 封面圖
2. 分類 / 年份
3. 遊戲名稱
4. 一段摘要
5. 可用內容類型標籤
6. 「查看完整條目」按鈕

條目本身不應在卡片內塞入所有媒體，而是在 Dialog 中顯示，確保首頁卡片高度穩定且可擴充。

## 7. 條目資料架構

條目資料集中於 `script.js` 的 `games` 陣列。每個遊戲可使用以下欄位：

```js
{
  id: "unique-id",
  title: "遊戲名稱",
  category: "adventure",
  categoryLabel: "冒險",
  year: "2026",
  summary: "首頁短摘要",
  cover: "封面圖片網址",
  text: "完整文字介紹",
  images: ["圖片1", "圖片2"],
  video: "可嵌入影片網址",
  html: "HTML 作品網址或相對路徑",
  slides: "簡報網址"
}
```

沒有使用的媒體欄位可留空字串或空陣列；介面會自動隱藏該區塊。

## 8. 響應式設計

主要 Breakpoints：

- `> 920px`：桌機版，遊戲卡片 3 欄
- `681–920px`：平板版，遊戲卡片 2 欄
- `<= 680px`：手機版，遊戲卡片 1 欄，導覽列改為漢堡選單

手機版優先規則：

- 所有主要按鈕至少約 44px 高
- Hero CTA 改為垂直排列
- Dialog 圖片 Gallery 改單欄
- 長標題使用 `clamp()` 避免溢出

## 9. 圖片與媒體規範

- 封面建議比例：`16:10`
- 內容影片與 HTML iframe：`16:9`
- 圖片建議使用 WebP / AVIF，兼顧載入速度
- 外部影片需使用可嵌入的 iframe URL
- 簡報可使用 Google Slides、PowerPoint Online 或自製 HTML Slides

## 10. 擴充原則

未來新增功能時，優先維持以下原則：

- 資料與版型分離
- 元件化 class 命名
- CSS 變數集中管理設計 Token
- 避免每個條目建立獨立 HTML 頁面，除非該作品本身需要獨立執行
- 可在 `games` 陣列新增 `tags`、`platforms`、`status`、`links` 等欄位，再由 JavaScript 統一渲染
