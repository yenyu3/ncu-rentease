import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import CompareTable from '../components/CompareTable';
import ListingDetailModal from '../components/ListingDetailModal';
import useStore from '../store/useStore';
import { Heart, BarChart3 } from 'lucide-react';

const Favorites = () => {
  const { getFavoriteListings } = useStore();
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState({});

  const favoriteListings = getFavoriteListings();

  const handleCompareToggle = (listing) => {
    setSelectedForCompare(prev => {
      const isSelected = prev.some(item => item.id === listing.id);
      if (isSelected) {
        return prev.filter(item => item.id !== listing.id);
      } else if (prev.length < 3) {
        return [...prev, listing];
      }
      return prev;
    });
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  const handleNoteChange = (listingId, note) => {
    setNotes(prev => ({ ...prev, [listingId]: note }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold flex items-center">
          <Heart className="mr-2" size={24} />
          我的收藏
        </h1>
        <p className="text-sm text-primary-100">管理你收藏的房源</p>
      </div>

      <div className="p-4">
        {favoriteListings.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">還沒有收藏任何房源</p>
            <p className="text-sm text-gray-400">去首頁或地圖找找喜歡的房源吧！</p>
          </div>
        ) : (
          <>
            {/* 比較功能控制 */}
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                已收藏 {favoriteListings.length} 間房源
              </div>
              <div className="flex gap-2">
                {selectedForCompare.length >= 2 && (
                  <button
                    onClick={() => setShowCompare(!showCompare)}
                    className="bg-accent text-white px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <BarChart3 size={16} className="mr-1" />
                    {showCompare ? '隱藏比較' : `比較 (${selectedForCompare.length})`}
                  </button>
                )}
                {selectedForCompare.length > 0 && (
                  <button
                    onClick={() => setSelectedForCompare([])}
                    className="text-gray-500 px-3 py-1 rounded-full text-sm border border-gray-300"
                  >
                    清除選擇
                  </button>
                )}
              </div>
            </div>

            {/* 比較表格 */}
            {showCompare && selectedForCompare.length >= 2 && (
              <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-accent">房源比較</h3>
                <CompareTable listings={selectedForCompare} />
              </div>
            )}

            {/* 房源列表 */}
            <div className="space-y-4">
              {favoriteListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* 比較選擇 */}
                  <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedForCompare.some(item => item.id === listing.id)}
                        onChange={() => handleCompareToggle(listing)}
                        disabled={!selectedForCompare.some(item => item.id === listing.id) && selectedForCompare.length >= 3}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">加入比較</span>
                    </label>
                    {selectedForCompare.length >= 3 && !selectedForCompare.some(item => item.id === listing.id) && (
                      <span className="text-xs text-gray-400">最多選擇3間</span>
                    )}
                  </div>

                  {/* 房源卡片 */}
                  <div onClick={() => handleListingClick(listing)} className="cursor-pointer">
                    <ListingCard listing={listing} onClick={handleListingClick} />
                  </div>

                  {/* 個人筆記 */}
                  <div className="p-4 border-t bg-gray-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      個人筆記
                    </label>
                    <textarea
                      value={notes[listing.id] || ''}
                      onChange={(e) => handleNoteChange(listing.id, e.target.value)}
                      placeholder="記錄你對這間房源的想法..."
                      className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                      rows="2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Favorites;