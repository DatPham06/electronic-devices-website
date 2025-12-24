import React, { useMemo } from 'react';
import { Product } from '../types';

interface CatalogProps {
  onProductClick: (product: Product) => void;
  products: Product[];
  searchQuery?: string;
  onClearSearch?: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ onProductClick, products, searchQuery, onClearSearch }) => {
  
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, products]);

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                 <h1 className="text-3xl font-bold text-white mb-2">
                    {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : "Tất cả sản phẩm"}
                 </h1>
                 <p className="text-text-secondary">
                    {searchQuery 
                      ? `Tìm thấy ${filteredProducts.length} sản phẩm phù hợp.` 
                      : "Khám phá bộ sưu tập âm thanh chất lượng cao"}
                 </p>
                 {searchQuery && (
                   <button 
                     onClick={onClearSearch}
                     className="mt-2 text-primary hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
                   >
                     <span className="material-symbols-outlined text-sm">close</span>
                     Xóa tìm kiếm
                   </button>
                 )}
            </div>
            {!searchQuery && (
              <div className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary">Sắp xếp:</span>
                  <select className="bg-surface-dark border border-border-dark text-white text-sm rounded-lg px-3 py-2 focus:ring-primary focus:border-primary">
                      <option>Mới nhất</option>
                      <option>Giá: Thấp đến Cao</option>
                      <option>Giá: Cao đến Thấp</option>
                  </select>
              </div>
            )}
        </div>

        {filteredProducts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 bg-surface-dark/50 rounded-2xl border border-dashed border-border-dark">
              <span className="material-symbols-outlined text-6xl text-text-secondary mb-4 opacity-50">search_off</span>
              <p className="text-white text-lg font-medium">Không tìm thấy sản phẩm nào</p>
              <p className="text-text-secondary text-sm mt-1">Vui lòng thử từ khóa khác.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => onProductClick(product)}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-[#23263a] to-[#12141c] p-6 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-screen group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-1 truncate">{product.name}</h3>
                    <p className="text-text-secondary text-sm mb-4 truncate">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">${product.price}</span>
                      <button className="text-primary hover:text-white transition-colors">Chi tiết</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;