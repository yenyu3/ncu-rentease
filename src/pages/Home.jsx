import { useState } from 'react';
import { Search, TrendingUp, MapPin, Star } from 'lucide-react';
import Logo from '../components/Logo';
import FilterChips from '../components/FilterChips';
import ListingCard from '../components/ListingCard';
import ListingDetailModal from '../components/ListingDetailModal';
import useStore from '../store/useStore';

const Home = () => {
  const { getFilteredListings, searchQuery, setSearchQuery } = useStore();
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredListings = getFilteredListings();

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-accent pb-20">
      {/* Hero Section */}
      <div className="px-4 pt-8 pb-12">
        <Logo size="lg" />
        
        {/* 主搜尋區域 */}
        <div className="mt-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">找到你的理想租屋</h2>
          <p className="text-primary-100 mb-6">中大周邊優質房源，一鍵搜尋</p>
          
          {/* 大搜尋框 */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="搜尋地址、房源標題或關鍵字..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            />
          </div>
        </div>
        
        {/* 快速統計 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{filteredListings.length}</div>
            <div className="text-xs text-primary-100">可租房源</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">4.2</div>
            <div className="text-xs text-primary-100">平均評分</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">8K</div>
            <div className="text-xs text-primary-100">平均租金</div>
          </div>
        </div>
        
        {/* 篩選按鈕 */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl font-medium"
        >
          {showFilters ? '隱藏篩選條件' : '顯示篩選條件'}
        </button>
      </div>
      
      {/* 內容區域 */}
      <div className="bg-gray-50 rounded-t-3xl min-h-screen pt-6">
        <div className="px-4">
          {/* 篩選條件 */}
          {showFilters && (
            <div className="mb-6">
              <FilterChips />
            </div>
          )}
          
          {/* 房源列表標題 */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-accent flex items-center">
              <TrendingUp className="mr-2" size={20} />
              推薦房源
            </h2>
            <span className="text-sm text-gray-500">共 {filteredListings.length} 間</span>
          </div>
          
          {/* 房源列表 */}
          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">沒有找到符合條件的房源</p>
              <p className="text-sm text-gray-400">試試調整搜尋條件或篩選器</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={handleListingClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;