import { X, MapPin, Star, Phone, Wifi, Car, Users } from 'lucide-react';
import { getDistanceInfo } from '../utils/distanceUtils';

const ListingDetailModal = ({ listing, isOpen, onClose }) => {
  if (!isOpen || !listing) return null;

  const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-accent">{listing.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
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

          {/* 距離資訊 */}
          <div className="bg-secondary/30 rounded-lg p-3 mb-4">
            <h3 className="font-semibold mb-2">🚶‍♂️ 到中大距離</h3>
            <div className="text-sm space-y-1">
              <div>距離：{distanceInfo.distance}</div>
              <div>步行時間：約 {distanceInfo.walkingTime} 分鐘</div>
              <div>🎵 約 {distanceInfo.songCount} 首歌的距離</div>
            </div>
            
            {distanceInfo.recommendedSongs.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">推薦歌單：</h4>
                <div className="space-y-1">
                  {distanceInfo.recommendedSongs.map((song, index) => (
                    <div key={song.id} className="text-xs bg-white rounded px-2 py-1">
                      {index + 1}. {song.title} - {song.artist}
                    </div>
                  ))}
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
    </div>
  );
};

export default ListingDetailModal;