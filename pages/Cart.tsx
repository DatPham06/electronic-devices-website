import React from 'react';
import { CartItem, Product } from '../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Giỏ hàng của bạn</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-surface-dark rounded-2xl border border-border-dark">
            <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">shopping_cart_off</span>
            <p className="text-white text-xl font-bold mb-2">Giỏ hàng trống</p>
            <p className="text-text-secondary">Hãy khám phá các sản phẩm âm thanh đỉnh cao của chúng tôi.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items List */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface-dark rounded-xl p-4 border border-border-dark flex gap-4 items-center group hover:border-primary/30 transition-colors">
                  <div className="w-24 h-24 bg-background-dark rounded-lg p-2 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-screen" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <p className="text-text-secondary text-sm">Số lượng: {item.quantity}</p>
                    <p className="text-primary font-bold mt-1">${item.price * item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-surface-dark rounded-xl border border-border-dark p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Tóm tắt đơn hàng</h3>
                <div className="space-y-3 mb-6">
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
                </div>
                
                <div className="border-t border-border-dark pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-text-secondary">Tổng cộng</span>
                    <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                    onClick={onCheckout}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                >
                   Tiến hành thanh toán
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                
                <div className="mt-6 flex justify-center gap-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    Bảo mật
                  </div>
                   <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    Freeship
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;