import { useState } from 'react';
import { Heart, MapPin, Star, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import useStore from '../store/useStore';
import { getDistanceInfo } from '../utils/distanceUtils';

const ListingCard = ({ listing, onClick }) => {
  const { currentUser, toggleFavorite } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isFavorited = currentUser.favorites.includes(listing.id);
  const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === listing.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.photos.length - 1 : prev - 1
    );
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => onClick && onClick(listing)}
    >
      {/* 圖片輪播區域 */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.photos[currentImageIndex]} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        
        {/* 圖片導航 */}
        {listing.photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
            >
              <ChevronRight size={16} />
            </button>
            
            {/* 圖片指示器 */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {listing.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            {/* 照片數量 */}
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Camera size={12} className="mr-1" />
              {listing.photos.length}
            </div>
          </>
        )}
        
        {/* 收藏按鈕 */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-sm ${
            isFavorited ? 'bg-red-500/80 text-white' : 'bg-white/80 text-gray-600'
          } hover:scale-110 transition-transform`}
        >
          <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* 內容區域 */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-accent flex-1 line-clamp-1">{listing.title}</h3>
        </div>
      
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1 text-gray-400" />
          <span className="text-sm line-clamp-1">{listing.address}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{listing.avgRating}</span>
            <span className="text-xs text-gray-500 ml-1">({listing.reviewsCount}則)</span>
          </div>
          <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            🚶♂️ {distanceInfo.walkingTime}分鐘
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xl font-bold text-primary">
              ${listing.rentMin.toLocaleString()}
              {listing.rentMin !== listing.rentMax && ` - ${listing.rentMax.toLocaleString()}`}
            </div>
            <div className="text-xs text-gray-500">/月</div>
          </div>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {listing.rooms}
          </span>
        </div>
        
        {/* 設施標籤 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.indoorFacilities.slice(0, 3).map((facility) => (
            <span key={facility} className="bg-secondary text-accent px-2 py-1 rounded text-xs">
              {facility}
            </span>
          ))}
          {listing.indoorFacilities.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{listing.indoorFacilities.length - 3}項
            </span>
          )}
        </div>
        
        <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full inline-block">
          🎵 約 {distanceInfo.songCount} 首歌的距離
        </div>
      </div>
    </div>
  );
};

export default ListingCard;