# Portal Dash 擲骰

Minecraft: Portal Dash 的擲骰輔助工具。行動骰（方塊骰＋怪物骰）與戰鬥骰、
重骰機制、成功率計算、頭目血量追蹤。長按搖骰、放開後骰子逐顆落定。

非官方玩家自製工具，與 Mojang Studios、Microsoft、Ravensburger 均無關聯。

---

## 檔案清單

| 檔案 | 作用 | 能不能省略 |
|---|---|---|
| `index.html` | 主程式，所有功能、圖示、音效都在裡面 | 必要 |
| `manifest.json` | 讓手機可以「加到主畫面」 | 省略就不能安裝 |
| `sw.js` | 離線快取 | 省略就不能離線 |
| `icon-192.png` | 主畫面圖示 | 省略會用預設圖 |
| `icon-512.png` | 高解析圖示 | 同上 |
| `icon-512-maskable.png` | Android 自適應圖示 | 同上 |
| `robots.txt` | 擋搜尋引擎收錄 | 可省略 |

隊列、等級、頭目設定會存在瀏覽器裡（localStorage），中途重新整理或鎖屏不會弄丟。
換手機或清瀏覽器資料才會重置。

---

## 丟上 GitHub（全程用網頁介面，不需要裝 git）

### 1. 建立 repo

1. 登入 GitHub，右上「+」→ **New repository**
2. Repository name：`portal-dash`（名字會出現在網址裡，建議短一點、全小寫）
3. 選 **Public**
   　→ 免費方案的 GitHub Pages 只支援公開 repo。設 Private 會找不到 Pages 選項。
4. 其他都不用勾，按 **Create repository**

### 2. 上傳檔案

1. 在剛建好的 repo 頁面，按 **Add file** → **Upload files**
2. 把這 7 個檔案**全部一起**拖進去
   　→ **不要放進資料夾**，必須在最上層。放進子資料夾的話所有相對路徑都會錯。
3. 下方 Commit changes 按下去

### 3. 開啟 Pages

1. repo 上方的 **Settings**（齒輪，不是你帳號的 Settings）
2. 左側選單往下找 **Pages**
3. Build and deployment 區塊：
   - Source：**Deploy from a branch**
   - Branch：**main**，資料夾選 **/ (root)**
4. 按 **Save**

等一到兩分鐘（repo 的 Actions 分頁可以看到進度），完成後 Pages 頁面上方會顯示網址：

```
https://<你的帳號>.github.io/portal-dash/
```

因為主檔叫 `index.html`，網址結尾不需要再加檔名。

---

## 加到主畫面

**Android（Chrome）**
開啟網址 → 右上 ⋮ → 「安裝應用程式」或「加到主畫面」

**iPhone / iPad**
必須用 **Safari** 開啟（Chrome for iOS 沒有這個功能）→
下方分享鈕 → 「加入主畫面」

裝好之後就跟一般 App 一樣：獨立圖示、全螢幕、離線可用，
也不會再經過 Messenger 或 LINE 的內建瀏覽器。

要確認離線真的生效：開過一次之後把飛航模式打開，再從主畫面點開，
應該完全正常。

---

## 之後要改東西

改完 `index.html` 上傳覆蓋之後，**一定要同時把 `sw.js` 裡的版本號加一**：

```js
const VERSION = 'pd-v1';   // → 改成 'pd-v2'
```

沒改版本號的話，已經裝在手機上的舊快取不會更新，你會一直看到舊版本。

改完等一兩分鐘讓 Pages 重新部署，手機上把 App 關掉再開兩次
（第一次抓新檔、第二次生效）。

---

## 出問題時

主程式帶了畫面上的錯誤顯示：任何 JavaScript 錯誤都會在畫面底部出現一條紅色橫幅，
寫出訊息和行號。手機沒有 console，出問題直接看那一行。

常見狀況：

- **網址打開是 404** — Pages 還在部署，或檔案放進了子資料夾
- **能開但不能安裝到主畫面** — 確認 `manifest.json` 和三個 icon 都有上傳成功
- **改了東西手機看不到** — `sw.js` 的 `VERSION` 沒加一
