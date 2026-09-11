# GAME//VAULT 靜態網站

## 使用方式

直接開啟 `index.html` 即可瀏覽。若瀏覽器限制本機 iframe，建議用簡易本機伺服器：

```bash
python -m http.server 8000
```

之後瀏覽 `http://localhost:8000`。

## 檔案

- `index.html`：首頁結構
- `styles.css`：完整視覺與響應式樣式
- `script.js`：遊戲資料、篩選、Dialog 與導覽互動
- `design.md`：整體設計規範
- `demo-*.html`：3 個 HTML 作品示範

## 新增遊戲

在 `script.js` 的 `games` 陣列加入新物件即可。空白的媒體欄位會自動隱藏。
