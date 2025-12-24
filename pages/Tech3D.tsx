import React from 'react';
import { Page } from '../types';

interface Tech3DProps {
  onNavigate: (page: Page) => void;
}

const Tech3D: React.FC<Tech3DProps> = ({ onNavigate }) => {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-background-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background-dark to-background-dark z-0"></div>
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(#282b39 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
           <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary font-mono text-sm uppercase tracking-widest">Next Gen Audio</div>
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Không gian âm thanh <br/> <span className="text-primary">Đa chiều</span></h1>
           <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
             Khám phá công nghệ Spatial Audio độc quyền của AudioTech. Biến mọi bản nhạc thành trải nghiệm hòa nhạc trực tiếp ngay trong tai bạn.
           </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-24 bg-surface-dark border-y border-border-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <img 
                    src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop" 
                    alt="Waveform visualization" 
                    className="rounded-2xl border border-border-dark shadow-2xl shadow-primary/10"
                 />
              </div>
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">Theo dõi chuyển động đầu</h2>
                    <p className="text-text-secondary text-lg">
                      Cảm biến con quay hồi chuyển tích hợp theo dõi chuyển động đầu của bạn 1000 lần mỗi giây, neo giữ âm thanh vào không gian thực để tạo cảm giác chân thực tuyệt đối.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 bg-background-dark rounded-xl border border-border-dark">
                       <span className="material-symbols-outlined text-4xl text-primary mb-4">sensors</span>
                       <h3 className="text-white font-bold mb-2">Cảm biến 6 trục</h3>
                       <p className="text-text-secondary text-sm">Độ chính xác milimet</p>
                    </div>
                    <div className="p-6 bg-background-dark rounded-xl border border-border-dark">
                       <span className="material-symbols-outlined text-4xl text-primary mb-4">speed</span>
                       <h3 className="text-white font-bold mb-2">Độ trễ bằng 0</h3>
                       <p className="text-text-secondary text-sm">Phản hồi tức thì</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Immersive Section */}
      <section className="py-24">
         <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cấu trúc Driver lượng tử</h2>
               <p className="text-text-secondary">Thiết kế độc quyền giúp tái tạo dải âm siêu rộng.</p>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-surface-dark border border-border-dark aspect-video flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1558537348-c0f8e747b0a7?q=80&w=2070&auto=format&fit=crop" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                 alt="Internal components"
               />
               
               <div className="relative z-20 text-center">
                  <button 
                    onClick={() => onNavigate(Page.CATALOG)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 mx-auto"
                  >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Sở hữu công nghệ này
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Tech3D;