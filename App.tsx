import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Tech3D from './pages/Tech3D';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout'; // Import Checkout
import { Page, Product, CartItem, User } from './types';
import { FEATURED_PRODUCT } from './constants';
import { api } from './services/api'; 

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product>(FEATURED_PRODUCT);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State quản lý dữ liệu từ "Backend"
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Update state to hold full User object
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load dữ liệu khi khởi động App
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        // 1. Lấy danh sách sản phẩm
        const products = await api.getProducts();
        setAllProducts(products);

        // 2. Kiểm tra phiên đăng nhập cũ
        const user = api.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  const handleNavigate = (page: Page) => {
    window.scrollTo(0, 0);
    if (page === Page.HOME || page === Page.TECH_3D || page === Page.SUPPORT) {
      setSearchQuery('');
    }
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(Page.CATALOG);
    window.scrollTo(0, 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate(Page.PRODUCT_DETAIL);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutNav = () => {
      if (cartItems.length === 0) return;
      handleNavigate(Page.CHECKOUT);
  };

  const handlePlaceOrder = async (customerInfo: any) => {
      // Simulate order processing logic here (API call, etc.)
      console.log("Order Placed:", { customerInfo, items: cartItems });
      
      // Clear Cart
      setCartItems([]);
      
      alert(`Đặt hàng thành công! Cảm ơn bạn ${customerInfo.fullName} đã mua sắm.`);
      
      // Navigate Home
      handleNavigate(Page.HOME);
  };

  // Login Handler (Đã cập nhật để dùng API)
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentPage(Page.ADMIN);
    } else {
      // Nếu có hàng trong giỏ, ưu tiên quay lại checkout hoặc home
      if (cartItems.length > 0 && currentPage === Page.CHECKOUT) {
          // Stay on checkout if logic permits, currently login page replaces view so we assume basic nav
          setCurrentPage(Page.CHECKOUT);
      } else {
          setCurrentPage(Page.HOME);
      }
    }
  };

  // Update Profile Handler
  const handleUpdateUser = async (updatedUser: User) => {
    const savedUser = await api.updateProfile(updatedUser);
    setCurrentUser(savedUser);
    // alert("Đã cập nhật thông tin thành công!");
  };

  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
    handleNavigate(Page.LOGIN);
  };

  // Admin Handlers (Đã cập nhật để dùng API)
  const handleAddProduct = async (newProduct: Product) => {
    // Gọi API để lưu vào localStorage
    const savedProduct = await api.addProduct(newProduct);
    // Cập nhật UI
    setAllProducts(prev => [savedProduct, ...prev]);
  };

  const handleDeleteProduct = async (id: number) => {
    // Gọi API để xóa khỏi localStorage
    await api.deleteProduct(id);
    // Cập nhật UI
    setAllProducts(prev => prev.filter(p => p.id !== id));
  };

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             <p className="text-white text-sm animate-pulse">Đang kết nối đến máy chủ...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} products={allProducts} />;
      case Page.PRODUCT_DETAIL:
        return <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} />;
      case Page.CART:
        return <Cart items={cartItems} onRemove={handleRemoveFromCart} onCheckout={handleCheckoutNav} />;
      case Page.CHECKOUT:
        return <Checkout items={cartItems} user={currentUser} onPlaceOrder={handlePlaceOrder} onBackToCart={() => handleNavigate(Page.CART)} />;
      case Page.LOGIN:
        return <Login onLogin={handleLoginSuccess} />;
      case Page.REGISTER:
        return <Register onRegisterSuccess={() => handleNavigate(Page.LOGIN)} onGoToLogin={() => handleNavigate(Page.LOGIN)} />;
      case Page.CATALOG:
        return <Catalog onProductClick={handleProductClick} products={allProducts} searchQuery={searchQuery} onClearSearch={handleClearSearch} />;
      case Page.TECH_3D:
        return <Tech3D onNavigate={handleNavigate} />;
      case Page.SUPPORT:
        return <Support />;
      case Page.ADMIN:
        return <Admin products={allProducts} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />;
      case Page.PROFILE:
        return currentUser ? <Profile user={currentUser} onUpdateUser={handleUpdateUser} /> : <Login onLogin={handleLoginSuccess} />;
      default:
        return <Home onNavigate={handleNavigate} onProductClick={handleProductClick} products={allProducts} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white font-display">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onSearch={handleSearch}
        user={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== Page.LOGIN && currentPage !== Page.REGISTER && currentPage !== Page.ADMIN && <Footer />}
    </div>
  );
};

export default App;