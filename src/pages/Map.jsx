import { useState } from 'react';
import Logo from '../components/Logo';
import MapComponent from '../components/MapComponent';
import ListingDetailModal from '../components/ListingDetailModal';
import useStore from '../store/useStore';



const Map = () => {
  const { listings } = useStore();
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <Logo size="md" />
        <p className="text-sm text-primary-100 mt-2">在地圖上探索房源位置</p>
      </div>

      <div style={{ height: 'calc(100vh - 140px)', width: '100%', position: 'relative', zIndex: 1 }}>
        <MapComponent 
          listings={listings} 
          onListingClick={openDetailModal}
        />
      </div>

      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Map;