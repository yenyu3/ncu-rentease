import { Home, Heart } from 'lucide-react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 16, text: 'text-sm' },
    md: { container: 'w-12 h-12', icon: 20, text: 'text-lg' },
    lg: { container: 'w-16 h-16', icon: 24, text: 'text-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center">
      <div className={`${currentSize.container} bg-white rounded-full flex items-center justify-center shadow-lg mr-3 relative`}>
        <Home size={currentSize.icon} className="text-primary" />
        <Heart size={8} className="text-red-500 absolute -top-1 -right-1 fill-current" />
      </div>
      <div>
        <h1 className={`${currentSize.text} font-bold text-white`}>NCU RentEase</h1>
        <p className="text-xs text-primary-100">中大租屋小幫手</p>
      </div>
    </div>
  );
};

export default Logo;