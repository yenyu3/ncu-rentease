import { useState } from 'react';
import { X, MapPin, Star, Phone, ChevronLeft, ChevronRight, Music, Play } from 'lucide-react';
import { getDistanceInfo } from '../utils/distanceUtils';
import MusicPlayer from './MusicPlayer';

const ListingDetailModal = ({ listing, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  
  if (!isOpen || !listing) return null;

  const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-accent line-clamp-1 flex-1 mr-4">{listing.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        {/* 圖片輪播區域 */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={listing.photos[currentImageIndex]} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          
          {listing.photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight size={20} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {listing.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {listing.photos.length}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4">
          {/* 基本資訊 */}
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin size={16} className="mr-2" />
              <span>{listing.address}</span>
            </div>
            <div className="flex items-center mb-2">
              <Star size={16} className="text-yellow-400 mr-1" />
              <span>{listing.avgRating}</span>
              <span className="text-gray-500 ml-1">({listing.reviewsCount} 評價)</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">
              ${listing.rentMin.toLocaleString()}
              {listing.rentMin !== listing.rentMax && ` - ${listing.rentMax.toLocaleString()}`}
              <span className="text-base font-normal text-gray-600">/月</span>
            </div>
          </div>

          {/* 距離資訊和音樂推薦 */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-3 flex items-center">
              🚶♂️ 到中大距離
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{distanceInfo.distance}</div>
                <div className="text-xs text-gray-600">距離</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{distanceInfo.walkingTime}分</div>
                <div className="text-xs text-gray-600">步行時間</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{distanceInfo.songCount}首</div>
                <div className="text-xs text-gray-600">歌曲數量</div>
              </div>
            </div>
            
            {distanceInfo.recommendedSongs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium flex items-center">
                    <Music size={16} className="mr-1" />
                    推薦步行歌單
                  </h4>
                  <button
                    onClick={() => setShowMusicPlayer(true)}
                    className="bg-primary text-white px-3 py-1 rounded-full text-xs flex items-center hover:bg-primary/80"
                  >
                    <Play size={12} className="mr-1" />
                    播放
                  </button>
                </div>
                <div className="space-y-2">
                  {distanceInfo.recommendedSongs.slice(0, 3).map((song, index) => (
                    <div key={song.id} className="bg-white/80 rounded-lg px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{song.title}</div>
                        <div className="text-xs text-gray-600">{song.artist}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {song.lengthMinutes.toFixed(1)}分
                      </div>
                    </div>
                  ))}
                  {distanceInfo.recommendedSongs.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      還有 {distanceInfo.recommendedSongs.length - 3} 首歌曲...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 聯絡資訊 */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">聯絡資訊</h3>
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{listing.contactName}</span>
              <span className="ml-2 text-primary">{listing.contactPhones[0]}</span>
            </div>
          </div>

          {/* 房間設施 */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">房間設施</h3>
            <div className="flex flex-wrap gap-2">
              {listing.indoorFacilities.map((facility) => (
                <span key={facility} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {facility}
                </span>
              ))}
            </div>
          </div>

          {/* 公共設施 */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">公共設施</h3>
            <div className="flex flex-wrap gap-2">
              {listing.publicFacilities.map((facility) => (
                <span key={facility} className="bg-secondary text-accent px-2 py-1 rounded-full text-xs">
                  {facility}
                </span>
              ))}
            </div>
          </div>

          {/* 額外費用 */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">額外費用</h3>
            <div className="text-sm space-y-1">
              <div>水費：${listing.extraFees.water}/月</div>
              <div>電費：${listing.extraFees.electricity}/度</div>
              {listing.extraFees.management > 0 && (
                <div>管理費：${listing.extraFees.management}/月</div>
              )}
            </div>
          </div>

          {/* 備註 */}
          {listing.notes && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">備註</h3>
              <p className="text-sm text-gray-600">{listing.notes}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* 音樂播放器 */}
      <MusicPlayer 
        songs={distanceInfo.recommendedSongs}
        isVisible={showMusicPlayer}
        onClose={() => setShowMusicPlayer(false)}
      />
    </div>
  );
};

export default ListingDetailModal;