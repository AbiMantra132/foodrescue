import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import './layout.css';

export function Navbar() {
  return (
    <header className="navbar sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="content-wrap navbar-inner">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="FoodRescue Home">
          <div className="w-8 h-8 rounded-xl bg-[#E3F3EA] flex items-center justify-center text-[#007E68] transition-transform group-hover:scale-105">
            <Leaf className="w-4 h-4 fill-[#007E68]" />
          </div>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#111111] tracking-tight">
            Food<span className="text-[#007E68]">Rescue</span>
          </span>
        </Link>

        <nav>
          <ul className="nav-menu">
            <li><a href="#untuk-penyedia" className="nav-link font-medium">Jadi Penyedia</a></li>
            <li><a href="#untuk-pengelola" className="nav-link font-medium">Jadi Pengelola</a></li>
            <li><a href="#misi" className="nav-link font-medium">Misi</a></li>
            <li><Link to="/dashboard" className="nav-link font-semibold text-[#007E68]">Dashboard</Link></li>
            <li><Link to="/login" className="nav-link font-medium">Login</Link></li>
          </ul>
        </nav>

        <Link
          to="/register"
          className="px-6 py-2.5 rounded-full bg-[#007E68] hover:bg-[#0B3D2E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
