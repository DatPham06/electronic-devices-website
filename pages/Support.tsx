import React, { useState } from 'react';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');

  return (
    <div className="pt-24 min-h-screen pb-12 bg-background-dark">
       <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h1 className="text-4xl font-bold text-white mb-4">Trung tâm hỗ trợ</h1>
             <p className="text-text-secondary text-lg">Chúng tôi có thể giúp gì cho bạn hôm nay?</p>
             
             <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'faq' ? 'bg-primary text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}`}
                >
                  Câu hỏi thường gặp
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'contact' ? 'bg-primary text-white' : 'bg-surface-dark text-text-secondary hover:text-white'}`}
                >
                  Liên hệ trực tiếp
                </button>
             </div>
          </div>

          {activeTab === 'faq' ? (
             <div className="space-y-4">
                {[
                  { q: "Chính sách bảo hành của AudioTech như thế nào?", a: "Tất cả sản phẩm của AudioTech đều được bảo hành chính hãng 24 tháng. Lỗi 1 đổi 1 trong 30 ngày đầu nếu có lỗi từ nhà sản xuất." },
                  { q: "Tôi có thể trải nghiệm công nghệ 3D ở đâu?", a: "Bạn có thể ghé thăm showroom của chúng tôi tại TP.HCM để trải nghiệm trực tiếp hoặc sử dụng tính năng Demo 3D trên website này." },
                  { q: "Thời gian giao hàng mất bao lâu?", a: "Nội thành TP.HCM và Hà Nội: 1-2 ngày. Các tỉnh thành khác: 3-4 ngày làm việc." },
                  { q: "Sản phẩm có hỗ trợ kết nối đa thiết bị không?", a: "Có, các dòng tai nghe mới nhất của chúng tôi hỗ trợ Multipoint Bluetooth, cho phép kết nối cùng lúc 2 thiết bị." }
                ].map((item, idx) => (
                   <div key={idx} className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/30 transition-colors">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">help</span>
                        {item.q}
                      </h3>
                      <p className="text-text-secondary ml-8">{item.a}</p>
                   </div>
                ))}
             </div>
          ) : (
             <div className="bg-surface-dark border border-border-dark rounded-2xl p-8 max-w-2xl mx-auto">
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-white text-sm font-medium">Họ tên</label>
                         <input type="text" className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-white text-sm font-medium">Email</label>
                         <input type="email" className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Chủ đề</label>
                      <select className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                         <option>Hỗ trợ kỹ thuật</option>
                         <option>Bảo hành & Đổi trả</option>
                         <option>Tư vấn mua hàng</option>
                         <option>Khác</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-white text-sm font-medium">Nội dung</label>
                      <textarea rows={4} className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"></textarea>
                   </div>
                   <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20">
                      Gửi yêu cầu
                   </button>
                </form>
             </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
             <div className="p-6">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">call</span>
                <p className="text-white font-bold">1900 123 456</p>
                <p className="text-text-secondary text-sm">24/7 Hotline</p>
             </div>
             <div className="p-6">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">mail</span>
                <p className="text-white font-bold">support@audiotech.vn</p>
                <p className="text-text-secondary text-sm">Phản hồi trong 24h</p>
             </div>
             <div className="p-6">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">forum</span>
                <p className="text-white font-bold">Live Chat</p>
                <p className="text-text-secondary text-sm">Chat với chuyên gia</p>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Support;