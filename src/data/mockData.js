// 房源資料
export const listings = [
  {
    id: 1,
    title: "溫馨套房近中大後門",
    rentMin: 8000,
    rentMax: 8000,
    address: "桃園市中壢區中大路300號",
    contactName: "王小姐",
    contactPhones: ["0912-345-678"],
    rooms: "套房",
    indoorFacilities: ["冷氣", "洗衣機", "冰箱", "書桌", "衣櫃", "網路"],
    publicFacilities: ["停車位", "電梯", "管理員"],
    extraFees: { water: 150, electricity: 5, management: 200 },
    notes: "近便利商店，生活機能佳",
    photos: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: { lat: 24.9675, lng: 121.1950 },
    distanceToCampusMeters: 800,
    avgRating: 4.2,
    reviewsCount: 8
  },
  {
    id: 2,
    title: "雅房分租 - 中大學區",
    rentMin: 5500,
    rentMax: 6000,
    address: "桃園市中壢區五權里",
    contactName: "陳先生",
    contactPhones: ["0987-654-321"],
    rooms: "雅房",
    indoorFacilities: ["冷氣", "書桌", "衣櫃", "網路"],
    publicFacilities: ["洗衣機", "冰箱", "客廳", "廚房"],
    extraFees: { water: 200, electricity: 4, management: 0 },
    notes: "室友都是學生，環境單純",
    photos: ["/api/placeholder/400/300"],
    location: { lat: 24.9650, lng: 121.1920 },
    distanceToCampusMeters: 1200,
    avgRating: 3.8,
    reviewsCount: 5
  },
  {
    id: 3,
    title: "全新裝潢套房",
    rentMin: 12000,
    rentMax: 12000,
    address: "桃園市中壢區中正路88號",
    contactName: "李太太",
    contactPhones: ["0923-456-789"],
    rooms: "套房",
    indoorFacilities: ["冷氣", "洗衣機", "冰箱", "微波爐", "書桌", "衣櫃", "網路", "第四台"],
    publicFacilities: ["電梯", "管理員", "停車位", "健身房"],
    extraFees: { water: 0, electricity: 6, management: 300 },
    notes: "全新裝潢，設備齊全",
    photos: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: { lat: 24.9580, lng: 121.2010 },
    distanceToCampusMeters: 2000,
    avgRating: 4.7,
    reviewsCount: 12
  }
];

// 評價資料
export const reviews = [
  {
    id: 1,
    listingId: 1,
    userId: 1,
    rating: 4,
    tags: ["房東友善", "生活機能佳"],
    comment: "房東人很好，附近有很多吃的，走路到學校也不會太遠",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    listingId: 1,
    userId: 2,
    rating: 5,
    tags: ["交通便利", "安全"],
    comment: "地點很棒，晚上回家也很安全，推薦！",
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    listingId: 2,
    userId: 3,
    rating: 3,
    tags: ["便宜", "室友友善"],
    comment: "價格便宜，室友都很好相處，但設備比較舊",
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    listingId: 3,
    userId: 1,
    rating: 5,
    tags: ["設備新", "管理佳"],
    comment: "全新裝潢真的很棒，管理員也很負責任",
    createdAt: "2024-01-20"
  }
];

// 使用者資料
export const users = [
  {
    id: 1,
    nickname: "小明",
    department: "資工系",
    grade: "大三",
    points: 250,
    level: 3,
    badges: ["第一間收藏", "評論新手", "地圖探索者"],
    favorites: [1, 3]
  },
  {
    id: 2,
    nickname: "小美",
    department: "企管系",
    grade: "大二",
    points: 180,
    level: 2,
    badges: ["第一間收藏", "防雷守護者"],
    favorites: [2]
  },
  {
    id: 3,
    nickname: "阿華",
    department: "電機系",
    grade: "大四",
    points: 420,
    level: 5,
    badges: ["第一間收藏", "評論新手", "租屋評論家銅", "地圖探索者", "公車站走到腿軟大師"],
    favorites: [1, 2, 3]
  }
];

// 任務資料
export const missions = [
  {
    id: 1,
    title: "撰寫第一則評價",
    description: "為任一房源撰寫評價",
    points: 20,
    completed: false,
    type: "review"
  },
  {
    id: 2,
    title: "收藏第一間房源",
    description: "將喜歡的房源加入收藏",
    points: 10,
    completed: true,
    type: "favorite"
  },
  {
    id: 3,
    title: "地圖探索達人",
    description: "在地圖上點擊 10 個不同的房源標記",
    points: 15,
    completed: false,
    type: "explore"
  },
  {
    id: 4,
    title: "回報房源已出租",
    description: "幫助其他同學，回報已出租的房源",
    points: 10,
    completed: false,
    type: "report"
  },
  {
    id: 5,
    title: "每日登入",
    description: "連續登入 7 天",
    points: 35,
    completed: false,
    type: "daily"
  }
];

// 歌曲推薦資料
export const songRecommendations = [
  {
    id: 1,
    title: "晴天",
    artist: "周杰倫",
    lengthMinutes: 4.3,
    mood: "chill"
  },
  {
    id: 2,
    title: "稻香",
    artist: "周杰倫",
    lengthMinutes: 3.5,
    mood: "energetic"
  },
  {
    id: 3,
    title: "告白氣球",
    artist: "周杰倫",
    lengthMinutes: 3.8,
    mood: "chill"
  },
  {
    id: 4,
    title: "夜曲",
    artist: "周杰倫",
    lengthMinutes: 3.7,
    mood: "focus"
  },
  {
    id: 5,
    title: "青花瓷",
    artist: "周杰倫",
    lengthMinutes: 3.9,
    mood: "chill"
  }
];

// 徽章定義
export const badgeDefinitions = [
  {
    id: "first_favorite",
    name: "第一間收藏",
    description: "收藏了第一間房源",
    icon: "❤️"
  },
  {
    id: "review_newbie",
    name: "評論新手",
    description: "撰寫了第一則評價",
    icon: "✍️"
  },
  {
    id: "review_bronze",
    name: "租屋評論家銅",
    description: "撰寫了 5 則評價",
    icon: "🥉"
  },
  {
    id: "review_silver",
    name: "租屋評論家銀",
    description: "撰寫了 15 則評價",
    icon: "🥈"
  },
  {
    id: "review_gold",
    name: "租屋評論家金",
    description: "撰寫了 30 則評價",
    icon: "🥇"
  },
  {
    id: "map_explorer",
    name: "地圖探索者",
    description: "在地圖上探索了 10 個房源",
    icon: "🗺️"
  },
  {
    id: "safety_guardian",
    name: "防雷守護者",
    description: "回報了 5 個問題房源",
    icon: "🛡️"
  },
  {
    id: "walking_master",
    name: "公車站走到腿軟大師",
    description: "查看了超過 50 個房源的步行距離",
    icon: "🚶‍♂️"
  }
];