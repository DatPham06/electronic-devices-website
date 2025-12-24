import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-dark border-t border-border-dark pt-16 pb-8 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
              <h2 className="text-lg font-bold">AudioTech</h2>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Mang đến trải nghiệm âm thanh chân thực nhất. Công nghệ của tương lai, ngay hôm nay.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold mb-4">Sản phẩm</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Tai nghe Over-Ear</a></li>
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Tai nghe In-Ear</a></li>
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Loa Bluetooth</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold mb-4">Hỗ trợ</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Trung tâm bảo hành</a></li>
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-bold mb-4">Địa chỉ</h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2 text-text-secondary text-sm">
                <span className="material-symbols-outlined text-base mt-0.5">location_on</span>
                123 Đường Công Nghệ, Q.1, TP.HCM
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <span className="material-symbols-outlined text-base">phone</span>
                1900 123 456
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-dark pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs">© 2024 AudioTech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary text-xs hover:text-white">Điều khoản</a>
            <a href="#" className="text-text-secondary text-xs hover:text-white">Bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;