import { useEffect, useRef } from 'react';
import { getDistanceInfo } from '../utils/distanceUtils';

const MapComponent = ({ listings, onListingClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // 清理舊地圖
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // 清理容器
        if (mapRef.current) {
          mapRef.current.innerHTML = '';
        }

        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // 修復圖標
        if (L.default.Icon.Default.prototype._getIconUrl) {
          delete L.default.Icon.Default.prototype._getIconUrl;
        }
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // 創建地圖
        const map = L.default.map(mapRef.current).setView([24.9675, 121.1950], 14);
        
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // 中大標記 - 自定義圖標
        const ncuIcon = L.default.divIcon({
          html: '<div style="background: #3A4E6B; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid white;">NCU</div>',
          iconSize: [30, 30],
          className: 'custom-div-icon'
        });

        L.default.marker([24.9675, 121.1950], { icon: ncuIcon })
          .addTo(map)
          .bindPopup('<strong>國立中央大學</strong>');

        // 房源標記 - 自定義圖標
        listings.forEach(listing => {
          const houseIcon = L.default.divIcon({
            html: '<div style="background: #9BB7D4; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white;">🏠</div>',
            iconSize: [24, 24],
            className: 'custom-div-icon'
          });

          const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);
          
          L.default.marker([listing.location.lat, listing.location.lng], { icon: houseIcon })
            .addTo(map)
            .bindPopup(`
              <div style="min-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 8px;">${listing.title}</h3>
                <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${listing.address}</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-weight: bold;">$${listing.rentMin.toLocaleString()}</span>
                  <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 10px;">${listing.rooms}</span>
                </div>
                <div style="font-size: 11px; color: #888; margin-bottom: 8px;">
                  <div>🚶♂️ ${distanceInfo.distance} • ${distanceInfo.walkingTime}分鐘</div>
                  <div>🎵 約 ${distanceInfo.songCount} 首歌的距離</div>
                </div>
                <button onclick="window.openDetail(${listing.id})" style="width: 100%; background: #9BB7D4; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer;">查看詳情</button>
              </div>
            `);
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error('地圖初始化失敗:', error);
      }
    };

    // 全域函數
    window.openDetail = (id) => {
      const listing = listings.find(l => l.id === id);
      if (listing && onListingClick) {
        onListingClick(listing);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn('地圖清理警告:', e);
        }
        mapInstanceRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
      if (window.openDetail) {
        delete window.openDetail;
      }
    };
  }, [listings, onListingClick]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;