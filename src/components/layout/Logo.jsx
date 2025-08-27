import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import  pic  from "../../assets/no-face.png"

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200"
    >
      <div className="relative">
        <img src={pic} alt="logo" className='size-10 rounded-lg shadow-lg' />
        <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-aurora-300 group-hover:text-aurora-200 transition-colors duration-200 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white group-hover:text-aurora-300 transition-colors duration-200">
          Nua Store
        </span>
        <span className="text-xs text-white/60 group-hover:text-aurora-400 transition-colors duration-200">
          Premium Quality
        </span>
      </div>
    </Link>
  );
};

export default Logo;