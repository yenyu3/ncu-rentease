import { NavLink } from 'react-router-dom';
import { Home, Map, Heart, Users, User } from 'lucide-react';

const TabBar = () => {
  const tabs = [
    { path: '/', icon: Home, label: '首頁' },
    { path: '/map', icon: Map, label: '地圖' },
    { path: '/favorites', icon: Heart, label: '收藏' },
    { path: '/community', icon: Users, label: '社群' },
    { path: '/profile', icon: User, label: '我的' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-accent border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-secondary'
                  : 'text-gray-300 hover:text-secondary'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabBar;