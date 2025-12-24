import React, { useState } from 'react';
import { Product } from '../types';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Product) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
}

const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'Headphones',
    price: 0,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setIsProcessing(true);
      
      const productToAdd: Product = {
        id: 0, // ID sẽ được tạo tự động bởi "Backend"
        name: newProduct.name,
        category: newProduct.category || 'Headphones',
        price: Number(newProduct.price),
        image: newProduct.image || '',
        description: newProduct.description || '',
        features: [],
        reviews: 0,
        rating: 5,
        isNew: true
      };

      try {
          await onAddProduct(productToAdd);
          setIsAdding(false);
          setNewProduct({ name: '', category: 'Headphones', price: 0, image: '', description: '' });
          // alert("Đã thêm sản phẩm thành công!");
      } catch (error) {
          alert("Lỗi khi thêm sản phẩm");
      } finally {
          setIsProcessing(false);
      }
    }
  };

  const handleDelete = async (id: number) => {
      if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        try {
            await onDeleteProduct(id);
        } catch (error) {
            alert("Lỗi khi xóa sản phẩm");
        }
      }
  }

  return (
    <div className="pt-24 min-h-screen bg-background-dark pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase mb-2">
               Admin Portal
            </div>
            <h1 className="text-3xl font-bold text-white">Quản lý sản phẩm</h1>
            <p className="text-text-secondary">Dữ liệu được lưu trữ an toàn trong trình duyệt (LocalStorage).</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
            {isAdding ? 'Hủy bỏ' : 'Thêm sản phẩm'}
          </button>
        </div>

        {isAdding && (
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 mb-8 animate-[float_0.5s_ease-out]">
            <h3 className="text-xl font-bold text-white mb-4">Nhập thông tin sản phẩm mới</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-white text-sm">Tên sản phẩm</label>
                  <input 
                    className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:border-primary outline-none"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-white text-sm">Danh mục</label>
                  <select 
                    className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:border-primary outline-none"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Headphones">Headphones</option>
                    <option value="Wireless">Wireless</option>
                    <option value="Speakers">Speakers</option>
                    <option value="Studio">Studio</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-white text-sm">Giá ($)</label>
                  <input 
                    type="number"
                    className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:border-primary outline-none"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    required
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-white text-sm">URL Hình ảnh</label>
                  <input 
                    className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:border-primary outline-none"
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    placeholder="https://..."
                  />
               </div>
               <div className="md:col-span-2 space-y-2">
                  <label className="text-white text-sm">Mô tả</label>
                  <textarea 
                    className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:border-primary outline-none"
                    rows={3}
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  />
               </div>
               <div className="md:col-span-2">
                 <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                 >
                   {isProcessing ? (
                       <>
                         <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                         Đang lưu...
                       </>
                   ) : "Lưu sản phẩm"}
                 </button>
               </div>
            </form>
          </div>
        )}

        <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-background-dark border-b border-border-dark">
              <tr>
                <th className="p-4 text-text-secondary text-sm font-medium">ID</th>
                <th className="p-4 text-text-secondary text-sm font-medium">Hình ảnh</th>
                <th className="p-4 text-text-secondary text-sm font-medium">Tên sản phẩm</th>
                <th className="p-4 text-text-secondary text-sm font-medium">Danh mục</th>
                <th className="p-4 text-text-secondary text-sm font-medium">Giá</th>
                <th className="p-4 text-text-secondary text-sm font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-text-secondary text-sm">#{product.id}</td>
                  <td className="p-4">
                    <img src={product.image} alt="" className="w-12 h-12 object-contain bg-background-dark rounded border border-border-dark" />
                  </td>
                  <td className="p-4 text-white font-medium">{product.name}</td>
                  <td className="p-4 text-text-secondary text-sm">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-white font-bold">${product.price}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-text-secondary hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                      title="Xóa sản phẩm"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="p-8 text-center text-text-secondary">
              Chưa có sản phẩm nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;