import { Star, MapPin } from 'lucide-react';
import { getDistanceInfo } from '../utils/distanceUtils';

const CompareTable = ({ listings }) => {
  if (listings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        請選擇 2-3 間房源進行比較
      </div>
    );
  }

  const compareItems = [
    { key: 'title', label: '房源名稱' },
    { key: 'rent', label: '租金' },
    { key: 'rooms', label: '房型' },
    { key: 'distance', label: '距離中大' },
    { key: 'rating', label: '評價' },
    { key: 'facilities', label: '主要設施' },
    { key: 'parking', label: '停車位' },
    { key: 'contact', label: '聯絡人' }
  ];

  const renderCell = (listing, key) => {
    switch (key) {
      case 'title':
        return listing.title;
      case 'rent':
        return `$${listing.rentMin.toLocaleString()}${listing.rentMin !== listing.rentMax ? ` - ${listing.rentMax.toLocaleString()}` : ''}`;
      case 'rooms':
        return listing.rooms;
      case 'distance':
        const distanceInfo = getDistanceInfo(listing.distanceToCampusMeters);
        return `${distanceInfo.distance} (${distanceInfo.walkingTime}分鐘)`;
      case 'rating':
        return (
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 mr-1" />
            {listing.avgRating}
          </div>
        );
      case 'facilities':
        return listing.indoorFacilities.slice(0, 3).join(', ') + 
               (listing.indoorFacilities.length > 3 ? '...' : '');
      case 'parking':
        return listing.publicFacilities.includes('停車位') ? '✅' : '❌';
      case 'contact':
        return listing.contactName;
      default:
        return '';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-secondary text-left font-semibold">
              比較項目
            </th>
            {listings.map((listing) => (
              <th key={listing.id} className="border border-gray-300 p-3 bg-primary/10 text-left font-semibold min-w-[200px]">
                {listing.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareItems.map((item) => (
            <tr key={item.key}>
              <td className="border border-gray-300 p-3 bg-gray-50 font-medium">
                {item.label}
              </td>
              {listings.map((listing) => (
                <td key={listing.id} className="border border-gray-300 p-3">
                  {renderCell(listing, item.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;