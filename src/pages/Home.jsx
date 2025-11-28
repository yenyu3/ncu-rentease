import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import ListingCard from '../components/ListingCard';
import ListingDetailModal from '../components/ListingDetailModal';
import useStore from '../store/useStore';

const Home = () => {
  const { getFilteredListings } = useStore();
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold mb-2">NCU RentEase</h1>
        <p className="text-primary-100">找到你的理想租屋</p>
      </div>
      
      <div className="p-4">
        <SearchBar />
        <FilterChips />
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-accent mb-3">
            推薦房源 ({filteredListings.length})
          </h2>
        </div>
        
        {filteredListings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            沒有找到符合條件的房源
          </div>
        ) : (
          <div>
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
      
      <ListingDetailModal
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;