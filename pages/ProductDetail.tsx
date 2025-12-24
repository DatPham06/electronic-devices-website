import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, qty: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  
  // Logic xử lý hình ảnh & Thumbnail
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Giả lập danh sách ảnh (Trong thực tế sẽ lấy từ API/Product object)
  const productImages = [
      product.image,
      // Dùng ảnh placeholder khác để thấy sự thay đổi rõ rệt khi click thumbnail
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop"
  ];

  // Logic xử lý Drag to Rotate (Giả lập 3D)
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    // Thay đổi cursor
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Tăng tốc độ xoay một chút (chia nhỏ hơn thì xoay nhanh hơn)
    setRotation(prev => prev + deltaX / 5); 
    setStartX(e.clientX);
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  // Cleanup sự kiện khi unmount hoặc thả chuột ra ngoài
  useEffect(() => {
    const handleGlobalMouseUp = () => {
        if (isDragging) stopDragging();
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);


  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 py-4 mb-4">
          <span className="text-text-secondary text-sm font-medium">Trang chủ</span>
          <span className="text-text-secondary text-sm font-medium">/</span>
          <span className="text-text-secondary text-sm font-medium">{product.category}</span>
          <span className="text-text-secondary text-sm font-medium">/</span>
          <span className="text-white text-sm font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Visuals */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Viewer - Simulated 3D */}
            <div 
                ref={containerRef}
                className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c2035] to-[#101322] border border-border-dark group select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={stopDragging}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="absolute top-4 left-4 z-10 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 pointer-events-none">
                <span className="material-symbols-outlined text-[16px] animate-spin">3d_rotation</span>
                360° View Active
              </div>
              
              <div className="w-full h-full flex items-center justify-center p-8 relative perspective-1000">
                 {/* Background Glow */}
                 <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75 opacity-50 pointer-events-none"></div>
                 
                 {/* Image with 3D Transform */}
                 <div 
                    style={{ 
                        transform: `perspective(1000px) rotateY(${rotation}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.5s ease-out'
                    }}
                    className="w-full h-full flex items-center justify-center"
                 >
                     <img 
                        src={productImages[activeImageIndex]} 
                        alt={product.name} 
                        className="relative z-10 max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl pointer-events-none"
                        draggable={false}
                     />
                 </div>
              </div>

               <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-secondary text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 pointer-events-none transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                <span className="material-symbols-outlined text-[18px]">drag_pan</span>
                Kéo để xoay
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
               {productImages.map((imgUrl, index) => (
                 <button 
                    key={index} 
                    onClick={() => {
                        setActiveImageIndex(index);
                        setRotation(0); // Reset góc xoay khi đổi ảnh
                    }}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 bg-surface-dark p-2 transition-all ${activeImageIndex === index ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-border-dark opacity-70 hover:opacity-100'}`}
                 >
                    <img src={imgUrl} className="w-full h-full object-contain" alt={`View ${index + 1}`} />
                 </button>
               ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 flex flex-col h-full">
             <div className="sticky top-24 flex flex-col gap-6">
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary text-sm font-bold tracking-wider uppercase">Best Seller</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined fill-current text-[18px]">star</span>)}
                      <span className="text-text-secondary text-xs font-medium ml-1">({product.reviews || 0} đánh giá)</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{product.name}</h1>
                  <p className="text-text-secondary text-lg leading-relaxed mb-6">{product.description}</p>
                  
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-3xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && <span className="text-lg text-text-secondary line-through">${product.originalPrice}</span>}
                    {product.originalPrice && <span className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">Save ${product.originalPrice - product.price}</span>}
                  </div>
                </div>

                {/* Selectors */}
                <div className="space-y-6 border-t border-b border-border-dark py-6">
                   <div>
                      <h3 className="text-sm font-bold text-white mb-3">Màu sắc</h3>
                      <div className="flex gap-3">
                         {['#1c1c1c', '#e5e5e5', '#1132d4'].map((color) => (
                            <button 
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-white ring-2 ring-primary ring-offset-2 ring-offset-[#101322]' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                            />
                         ))}
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 items-stretch">
                   <div className="flex items-center border border-border-dark rounded-lg bg-surface-dark">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-white">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                      >
                        +
                      </button>
                   </div>
                   <button 
                      onClick={() => onAddToCart(product, quantity)}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-lg py-3 px-6 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span className="material-symbols-outlined">shopping_bag</span>
                      Thêm vào giỏ
                   </button>
                </div>

                {/* Specs Summary */}
                <div className="bg-surface-dark rounded-xl border border-border-dark p-6 mt-4">
                   <h3 className="text-lg font-bold text-white mb-4">Thông số kỹ thuật</h3>
                   <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-dashed border-border-dark">
                         <span className="text-text-secondary">Loại Driver</span>
                         <span className="text-white font-medium text-right">Dynamic Open-Back</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-dashed border-border-dark">
                         <span className="text-text-secondary">Tần số</span>
                         <span className="text-white font-medium text-right">5Hz - 40kHz</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-dashed border-border-dark">
                         <span className="text-text-secondary">Kết nối</span>
                         <span className="text-white font-medium text-right">Bluetooth 5.3 / 3.5mm</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;