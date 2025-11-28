import useStore from '../store/useStore';

const FilterChips = () => {
  const { selectedFilters, setFilters } = useStore();

  const priceRanges = [
    { label: '全部', value: [0, 20000] },
    { label: '5K以下', value: [0, 5000] },
    { label: '5K-8K', value: [5000, 8000] },
    { label: '8K-12K', value: [8000, 12000] },
    { label: '12K以上', value: [12000, 20000] }
  ];

  const roomTypes = [
    { label: '全部', value: '' },
    { label: '套房', value: '套房' },
    { label: '雅房', value: '雅房' }
  ];

  const handlePriceChange = (priceRange) => {
    setFilters({ ...selectedFilters, priceRange });
  };

  const handleRoomTypeChange = (roomType) => {
    setFilters({ ...selectedFilters, roomType });
  };

  const handleToggleFilter = (filterKey) => {
    setFilters({ ...selectedFilters, [filterKey]: !selectedFilters[filterKey] });
  };

  return (
    <div className="mb-4">
      {/* 價格篩選 */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceChange(range.value)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedFilters.priceRange[0] === range.value[0] && 
                selectedFilters.priceRange[1] === range.value[1]
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* 房型和設施篩選 */}
      <div className="flex flex-wrap gap-2">
        {roomTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => handleRoomTypeChange(type.value)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedFilters.roomType === type.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
            }`}
          >
            {type.label}
          </button>
        ))}
        
        <button
          onClick={() => handleToggleFilter('hasParking')}
          className={`px-3 py-1 rounded-full text-sm border ${
            selectedFilters.hasParking
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
          }`}
        >
          有停車位
        </button>
        
        <button
          onClick={() => handleToggleFilter('hasFurniture')}
          className={`px-3 py-1 rounded-full text-sm border ${
            selectedFilters.hasFurniture
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary'
          }`}
        >
          含家具
        </button>
      </div>
    </div>
  );
};

export default FilterChips;