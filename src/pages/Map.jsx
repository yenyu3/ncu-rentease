import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import ListingDetailModal from '../components/ListingDetailModal';
import useStore from '../store/useStore';
import { getDistanceInfo } from '../utils/distanceUtils';

const Map = () => {
  const { listings } = useStore();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 中央大學座標
  const ncuCenter = { lat: 24.9675, lng: 121.1950 };

  const mapContainerStyle = {
    width: '100%',
    height: 'calc(100vh - 140px)'
  };

  const mapOptions = {
    zoom: 14,
    center: ncuCenter,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const onMarkerClick = useCallback((listing) => {
    setSelectedMarker(listing);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const openDetailModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
    setSelectedMarker(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold">地圖找房</h1>
        <p className="text-sm text-primary-100">在地圖上探索房源位置</p>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyAE5QrIwGsTev56W6RsilmK07Uc1rYqgfc">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
        >
          {/* 中央大學標記 */}
          <Marker
            position={ncuCenter}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" fill="#3A4E6B" stroke="white" stroke-width="2"/>
                  <text x="15" y="19" text-anchor="middle" fill="white" font-size="12" font-weight="bold">NCU</text>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(30, 30)
            }}
            title="國立中央大學"
          />

          {/* 房源標記 */}
          {listings.map((listing) => (
            <Marker
              key={listing.id}
              position={listing.location}
              onClick={() => onMarkerClick(listing)}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#9BB7D4" stroke="white" stroke-width="2"/>
                    <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">🏠</text>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24)
              }}
            />
          ))}

          {/* 資訊視窗 */}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.location}
              onCloseClick={onInfoWindowClose}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-accent mb-1">{selectedMarker.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedMarker.address}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-primary">
                    ${selectedMarker.rentMin.toLocaleString()}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {selectedMarker.rooms}
                  </span>
                </div>
                
                {/* 距離資訊 */}
                <div className="text-xs text-gray-500 mb-3">
                  {(() => {
                    const distanceInfo = getDistanceInfo(selectedMarker.distanceToCampusMeters);
                    return (
                      <div>
                        <div>🚶♂️ {distanceInfo.distance} • {distanceInfo.walkingTime}分鐘</div>
                        <div>🎵 約 {distanceInfo.songCount} 首歌的距離</div>
                      </div>
                    );
                  })()}
                </div>
                
                <button
                  onClick={() => openDetailModal(selectedMarker)}
                  className="w-full bg-primary text-white py-1 px-3 rounded text-sm hover:bg-primary/80"
                >
                  查看詳情
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Map;