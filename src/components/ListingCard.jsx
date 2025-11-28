import { Heart, MapPin, Star } from 'lucide-react';
import useStore from '../store/useStore';
import { getDistanceInfo } from '../utils/distanceUtils';

const ListingCard = ({ listing, onClick }) => {
  const { currentUser, toggleFavorite } = useStore();
  const isFavorited = currentUser.favorites.includes(listing.id);
  const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick && onClick(listing)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-accent flex-1">{listing.title}</h3>
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full ${
            isFavorited ? 'text-red-500' : 'text-gray-400'
          } hover:bg-gray-100`}
        >
          <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-1" />
        <span className="text-sm">{listing.address}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star size={16} className="text-yellow-400 mr-1" />
          <span className="text-sm">{listing.avgRating}</span>
          <span className="text-xs text-gray-500 ml-1">({listing.reviewsCount})</span>
        </div>
        <div className="text-sm text-gray-600">
          {distanceInfo.distance} • {distanceInfo.walkingTime}分鐘
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-primary">
          ${listing.rentMin.toLocaleString()}
          {listing.rentMin !== listing.rentMax && ` - ${listing.rentMax.toLocaleString()}`}
          <span className="text-sm font-normal text-gray-600">/月</span>
        </div>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
          {listing.rooms}
        </span>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        🎵 約 {distanceInfo.songCount} 首歌的距離
      </div>
    </div>
  );
};

export default ListingCard;