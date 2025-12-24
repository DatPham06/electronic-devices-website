import React from 'react';
import { Page, Product } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onProductClick: (product: Product) => void;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, onProductClick, products }) => {
  // Use the products passed from props instead of the constant file
  const newArrivals = products.slice(0, 4); // Just take the first 4 for display

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
          {/* Hero Text */}
          <div className="flex flex-col gap-6 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-xs font-bold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Công nghệ âm thanh 3D mới nhất
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              Âm thanh <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-text-secondary">Vượt giới hạn</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
              Trải nghiệm kỹ thuật âm thanh đỉnh cao với công nghệ chống ồn chủ động và giả lập không gian 360°. Cảm nhận từng nhịp điệu như đang ở trong phòng thu.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate(Page.CATALOG)}
                className="flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(17,50,212,0.4)]"
              >
                Khám phá ngay
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button className="flex items-center gap-2 h-12 px-8 bg-surface-dark border border-border-dark hover:bg-border-dark text-white rounded-full font-bold transition-all">
                <span className="material-symbols-outlined">play_circle</span>
                Xem Demo 3D
              </button>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-border-dark/50 w-full mt-4">
              <div>
                <p className="text-2xl font-bold text-white">40h+</p>
                <p className="text-sm text-text-secondary">Pin liên tục</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0.02s</p>
                <p className="text-sm text-text-secondary">Độ trễ cực thấp</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">AI</p>
                <p className="text-sm text-text-secondary">Khử ồn thích ứng</p>
              </div>
            </div>
          </div>

          {/* Hero 3D Object Visualization */}
          <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center group perspective-1000">
             {/* Main Product Image with Float Animation */}
            <div className="relative z-10 w-full h-full animate-float flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
                    alt="Headphones"
                    className="max-h-[80%] max-w-[80%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-12 transition-transform duration-700 hover:rotate-0 hover:scale-110"
                 />
            </div>
            
            {/* Decorative Orbit Circles */}
            <div className="absolute border border-border-dark/30 rounded-full w-[80%] h-[80%] animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute border border-border-dark/20 rounded-full w-[60%] h-[60%] animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-background-dark relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Công nghệ tiên phong</h2>
            <p className="text-text-secondary text-lg">Sự kết hợp hoàn hảo giữa thiết kế công thái học và công nghệ âm thanh lượng tử.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'spatial_audio_off', title: 'Âm thanh 360 độ', desc: 'Cảm nhận âm nhạc bao trùm mọi giác quan với công nghệ giả lập không gian thực tế ảo.' },
              { icon: 'graphic_eq', title: 'Khử tiếng ồn AI', desc: 'Chip xử lý AI tự động nhận diện và loại bỏ tạp âm môi trường, giữ lại sự tinh khiết.' },
              { icon: 'battery_charging_full', title: 'Sạc nhanh siêu tốc', desc: 'Chỉ 10 phút sạc cho 5 giờ nghe nhạc. Tổng thời lượng pin lên đến 40 giờ.' }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-all duration-300 hover:bg-surface-dark/80 hover:-translate-y-2">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Sản phẩm mới ra mắt</h2>
              <p className="text-text-secondary">Những thiết bị mới nhất vừa cập bến AudioTech.</p>
            </div>
            <button 
                onClick={() => onNavigate(Page.CATALOG)}
                className="hidden sm:flex items-center gap-1 text-primary hover:text-white font-medium transition-colors"
            >
              Xem tất cả
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div 
                key={product.id} 
                className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <div className="relative aspect-square bg-gradient-to-br from-[#23263a] to-[#12141c] p-6 flex items-center justify-center">
                  {product.isNew && <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">MỚI</div>}
                  {product.isSale && <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-15%</div>}
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <button className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-primary rounded-full text-white transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">{product.name}</h3>
                  <p className="text-text-secondary text-sm mb-4 truncate">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                       {product.originalPrice && <span className="text-text-secondary text-xs line-through">${product.originalPrice}</span>}
                       <span className="text-white font-bold">${product.price}</span>
                    </div>
                    <button className="p-2 bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-24 relative bg-surface-dark border-t border-border-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Đăng ký nhận tin</h2>
          <p className="text-text-secondary mb-8">Nhận thông tin về các sản phẩm mới và ưu đãi độc quyền từ AudioTech.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
                type="email" 
                placeholder="Email của bạn" 
                className="flex-1 bg-background-dark border border-border-dark rounded-lg px-6 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
            />
            <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg shadow-primary/30">
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;