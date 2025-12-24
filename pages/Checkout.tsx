import React, { useState } from 'react';
import { CartItem, User } from '../types';

interface CheckoutProps {
  items: CartItem[];
  user: User | null;
  onPlaceOrder: (customerInfo: any) => Promise<void>;
  onBackToCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, user, onPlaceOrder, onBackToCart }) => {
  const [formData, setFormData] = useState({
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: '',
      paymentMethod: 'cod' // cod | credit
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(items.length === 0) return;

      setIsProcessing(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await onPlaceOrder(formData);
      setIsProcessing(false);
  };

  return (
    <div className="pt-24 min-h-screen pb-12 bg-background-dark">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
         <button onClick={onBackToCart} className="flex items-center gap-2 text-text-secondary hover:text-white mb-6 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại giỏ hàng
         </button>

         <h1 className="text-3xl font-bold text-white mb-8">Thanh toán đơn hàng</h1>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form Info */}
            <div className="lg:col-span-7 space-y-8">
               
               {/* Shipping Info */}
               <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">local_shipping</span>
                      Thông tin giao hàng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Họ và tên</label>
                          <input 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Nguyễn Văn A"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Số điện thoại</label>
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            type="tel"
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="0912..."
                          />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-white">Email</label>
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="email@example.com"
                          />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-white">Địa chỉ nhận hàng</label>
                          <input 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Số nhà, tên đường..."
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-white">Tỉnh / Thành phố</label>
                          <input 
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Hồ Chí Minh"
                          />
                      </div>
                  </div>
               </div>

               {/* Payment Method */}
               <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">credit_card</span>
                      Phương thức thanh toán
                  </h3>
                  <div className="space-y-4">
                      <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-border-dark bg-background-dark'}`}>
                          <input 
                             type="radio" 
                             name="paymentMethod" 
                             value="cod" 
                             checked={formData.paymentMethod === 'cod'}
                             onChange={handleChange}
                             className="text-primary focus:ring-primary bg-transparent border-white/20"
                          />
                          <div className="flex-1">
                              <p className="text-white font-bold">Thanh toán khi nhận hàng (COD)</p>
                              <p className="text-text-secondary text-sm">Thanh toán tiền mặt cho shipper khi nhận được hàng.</p>
                          </div>
                          <span className="material-symbols-outlined text-2xl text-text-secondary">payments</span>
                      </label>

                      <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'credit' ? 'border-primary bg-primary/10' : 'border-border-dark bg-background-dark'}`}>
                          <input 
                             type="radio" 
                             name="paymentMethod" 
                             value="credit" 
                             checked={formData.paymentMethod === 'credit'}
                             onChange={handleChange}
                             className="text-primary focus:ring-primary bg-transparent border-white/20"
                          />
                          <div className="flex-1">
                              <p className="text-white font-bold">Thẻ tín dụng / Ghi nợ quốc tế</p>
                              <p className="text-text-secondary text-sm">Visa, Mastercard, JCB</p>
                          </div>
                          <span className="material-symbols-outlined text-2xl text-text-secondary">credit_card</span>
                      </label>
                  </div>
               </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
               <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-6">Đơn hàng của bạn</h3>
                  
                  <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4 custom-scrollbar">
                     {items.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                           <div className="w-16 h-16 bg-background-dark rounded border border-border-dark p-1 flex-shrink-0 relative">
                               <img src={item.image} className="w-full h-full object-contain" alt="" />
                               <span className="absolute -top-2 -right-2 bg-text-secondary text-background-dark text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                   {item.quantity}
                               </span>
                           </div>
                           <div className="flex-1 overflow-hidden">
                               <p className="text-white font-medium text-sm truncate">{item.name}</p>
                               <p className="text-text-secondary text-xs">{item.category}</p>
                           </div>
                           <p className="text-white font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border-dark mb-6">
                      <div className="flex justify-between text-text-secondary text-sm">
                        <span>Tạm tính</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-text-secondary text-sm">
                        <span>Vận chuyển</span>
                        <span className="text-green-500">Miễn phí</span>
                      </div>
                      <div className="flex justify-between text-text-secondary text-sm">
                        <span>Thuế (8%)</span>
                        <span className="text-white">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-white font-bold">Tổng cộng</span>
                        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            Xác nhận đặt hàng
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                        </>
                    )}
                  </button>
                  <p className="text-center text-xs text-text-secondary mt-4">
                     Bằng việc đặt hàng, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.
                  </p>
               </div>
            </div>
         </form>
      </div>
    </div>
  );
};

export default Checkout;