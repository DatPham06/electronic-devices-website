import React, { useState } from 'react';
import { Page, User } from '../types';

interface NavbarProps {
  currentPage: Page;
  cartCount: number;
  user: User | null;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, cartCount, user, onNavigate, onSearch, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border-dark">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => onNavigate(Page.HOME)}
          >
            <div className="size-8 text-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined !text-4xl">graphic_eq</span>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">AudioTech</h2>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate(Page.HOME)}
              className={`text-sm font-medium transition-colors ${currentPage === Page.HOME ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => onNavigate(Page.CATALOG)}
              className={`text-sm font-medium transition-colors ${currentPage === Page.CATALOG ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              Sản phẩm
            </button>
            <button 
              onClick={() => onNavigate(Page.TECH_3D)}
              className={`text-sm font-medium transition-colors ${currentPage === Page.TECH_3D ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              Công nghệ 3D
            </button>
            
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate(Page.ADMIN)}
                className={`text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors ${currentPage === Page.ADMIN ? 'underline underline-offset-4' : ''}`}
              >
                Quản lý
              </button>
            )}

            <button 
              onClick={() => onNavigate(Page.SUPPORT)}
              className={`text-sm font-medium transition-colors ${currentPage === Page.SUPPORT ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            >
              Hỗ trợ
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-surface-dark rounded-full px-4 py-2 border border-border-dark focus-within:border-primary transition-colors w-48 lg:w-64">
              <span className="material-symbols-outlined text-text-secondary text-xl">search</span>
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="bg-transparent border-none text-white placeholder-text-secondary text-sm w-full focus:ring-0 ml-2"
              />
            </div>
            
            <button 
              onClick={() => onNavigate(Page.CART)}
              className="relative p-2 text-white hover:bg-surface-dark rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 size-4 flex items-center justify-center bg-primary rounded-full text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="hidden sm:flex items-center border-l border-border-dark pl-4 ml-2">
              {user ? (
                /* User Logged In State */
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-full hover:bg-white/5 transition-all"
                    onClick={() => onNavigate(Page.PROFILE)}
                    title="Xem hồ sơ"
                  >
                    <div className="text-right hidden lg:block">
                       <p className="text-sm font-bold text-white leading-none mb-0.5 group-hover:text-primary transition-colors">{user.name}</p>
                       <p className="text-[10px] text-text-secondary uppercase font-semibold">{user.role}</p>
                    </div>
                    <div className="size-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold border border-white/10 shadow-lg group-hover:ring-2 ring-primary/50 transition-all">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={onLogout}
                    title="Đăng xuất"
                    className="p-2 ml-1 text-text-secondary hover:text-red-400 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                  </button>
                </div>
              ) : (
                /* Guest State */
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onNavigate(Page.LOGIN)}
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${currentPage === Page.LOGIN ? 'text-white bg-surface-dark' : 'text-text-secondary hover:text-white'}`}
                  >
                    Đăng nhập
                  </button>
                  <button 
                    onClick={() => onNavigate(Page.REGISTER)}
                    className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-primary/20"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
            
             <button className="md:hidden p-2 text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;