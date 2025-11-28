# NCU RentEase - 中大校外租屋小幫手

一個專為中央大學學生設計的租屋平台，提供房源搜尋、地圖找房、社群評價和遊戲化體驗。

## 🚀 功能特色

### 📱 五大主要功能
1. **首頁探索** - 搜尋和篩選房源
2. **地圖找房** - 視覺化房源位置，整合 Google Maps
3. **收藏比較** - 收藏喜愛房源並進行比較
4. **社群評價** - 查看評價和轉租資訊
5. **個人檔案** - 遊戲化成就系統

### 🎯 特色功能
- **距離計算** - 自動計算到中大的步行時間
- **歌曲推薦** - 根據步行時間推薦歌單（"約幾首歌的距離"）
- **遊戲化系統** - 點數、等級、徽章獎勵機制
- **房源比較** - 多間房源並排比較功能
- **個人筆記** - 為收藏房源添加私人備註

## 🛠 技術架構

### 前端技術棧
- **React 18** - 主要框架
- **Vite** - 建置工具
- **React Router DOM** - 路由管理
- **Zustand** - 狀態管理
- **Tailwind CSS** - UI 樣式框架
- **Lucide React** - 圖標庫
- **@react-google-maps/api** - Google Maps 整合

### 專案結構
```
src/
├── components/          # 可重用元件
│   ├── TabBar.jsx      # 底部導航欄
│   ├── ListingCard.jsx # 房源卡片
│   ├── SearchBar.jsx   # 搜尋欄
│   ├── FilterChips.jsx # 篩選條件
│   ├── ListingDetailModal.jsx # 房源詳情彈窗
│   ├── MissionList.jsx # 任務列表
│   └── CompareTable.jsx # 房源比較表格
├── pages/              # 頁面元件
│   ├── Home.jsx        # 首頁
│   ├── Map.jsx         # 地圖頁面
│   ├── Favorites.jsx   # 收藏頁面
│   ├── Community.jsx   # 社群頁面
│   └── Profile.jsx     # 個人檔案
├── store/              # 狀態管理
│   └── useStore.js     # Zustand store
├── data/               # 假資料
│   └── mockData.js     # 模擬資料
├── utils/              # 工具函數
│   └── distanceUtils.js # 距離計算工具
├── App.jsx             # 主應用程式
├── main.jsx            # 入口點
└── index.css           # 全域樣式
```

## 🎨 設計系統

### 色彩主題
- **主色 (Primary)**: `#9BB7D4` - 藍灰色
- **次色 (Secondary)**: `#E4DFD8` - 米白色  
- **強調色 (Accent)**: `#3A4E6B` - 深藍色

### UI 元件
- 卡片設計採用圓角和陰影
- 按鈕使用主色系統
- 底部導航使用深藍背景配白色圖標
- 響應式設計適配手機螢幕

## 📊 資料結構

### 房源 (Listing)
```javascript
{
  id: number,
  title: string,
  rentMin: number,
  rentMax: number,
  address: string,
  contactName: string,
  contactPhones: string[],
  rooms: string, // "套房" | "雅房"
  indoorFacilities: string[],
  publicFacilities: string[],
  extraFees: { water: number, electricity: number, management: number },
  notes: string,
  photos: string[],
  location: { lat: number, lng: number },
  distanceToCampusMeters: number,
  avgRating: number,
  reviewsCount: number
}
```

### 使用者 (User)
```javascript
{
  id: number,
  nickname: string,
  department: string,
  grade: string,
  points: number,
  level: number,
  badges: string[],
  favorites: number[]
}
```

## 🎮 遊戲化機制

### 點數獲取規則
- 撰寫房源評價: +15 點
- 上傳房源照片: +15 點
- 回報房源已出租: +10 點
- 新增轉租貼文: +15 點
- 每日登入: +5 點

### 等級系統
- 公式: `level = Math.floor(points / 100) + 1`
- 每 100 點升一級

### 徽章系統
- 第一間收藏 ❤️
- 評論新手 ✍️
- 租屋評論家銅/銀/金 🥉🥈🥇
- 地圖探索者 🗺️
- 防雷守護者 🛡️
- 公車站走到腿軟大師 🚶♂️

## 🚶♂️ 距離計算功能

### 核心算法
```javascript
// 步行時間計算 (80m/分鐘)
const walkingTime = Math.ceil(distanceMeters / 80);

// 歌曲數量計算 (平均3.5分鐘/首)
const songCount = Math.ceil(walkingTime / 3.5);

// 根據距離推薦不同心情的歌曲
const mood = walkingTime > 15 ? 'energetic' : 
             walkingTime < 5 ? 'focus' : 'chill';
```

## 🗺️ Google Maps 整合

### 地圖功能
- 顯示中央大學位置標記
- 房源位置標記
- 點擊標記顯示房源資訊泡泡
- 整合距離計算和歌曲推薦

### API 設定
需要在 `Map.jsx` 中設定 Google Maps API Key:
```javascript
<LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
```

## 🚀 安裝與執行

### 環境需求
- Node.js 16+
- npm 或 yarn

### 安裝步驟
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

### 開發伺服器
```bash
npm run dev
```
應用程式將在 `http://localhost:5173` 運行

## 📱 使用說明

### 首頁功能
1. 使用搜尋欄輸入關鍵字
2. 點擊篩選條件快速篩選
3. 瀏覽房源卡片
4. 點擊愛心收藏房源
5. 點擊卡片查看詳細資訊

### 地圖功能
1. 查看房源在地圖上的位置
2. 點擊標記查看房源資訊
3. 查看到中大的距離和歌曲推薦

### 收藏功能
1. 查看已收藏的房源
2. 選擇2-3間房源進行比較
3. 為房源添加個人筆記

### 社群功能
1. 瀏覽其他使用者的評價
2. 依標籤篩選評價
3. 發布轉租資訊

### 個人檔案
1. 查看點數和等級進度
2. 檢視獲得的徽章
3. 完成每日任務獲得點數

## 🔮 未來擴展

### 可能的功能增強
- 後端 API 整合
- 使用者註冊登入系統
- 即時聊天功能
- 推播通知
- 房源預約看房功能
- 更多遊戲化元素

### 技術優化
- 加入 TypeScript
- 實作 PWA 功能
- 加入單元測試
- 效能優化
- SEO 優化

## 📄 授權

此專案僅供學習和展示用途。

---

**NCU RentEase** - 讓找房變得更簡單、更有趣！ 🏠✨