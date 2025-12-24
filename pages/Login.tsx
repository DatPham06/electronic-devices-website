import React, { useState } from 'react';
import { api } from '../services/api';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // State để lưu thông báo lỗi

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Xóa lỗi cũ trước khi thử đăng nhập mới

    try {
      // Trim email để tránh lỗi khoảng trắng
      const user = await api.login(email.trim(), password, rememberMe);
      onLogin(user);
    } catch (err: any) {
      console.error(err);
      // Lấy thông báo lỗi từ API
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Hiển thị thông báo yêu cầu tích hợp thực tế.
    setError(`Chức năng đăng nhập ${provider} chưa khả dụng (Cần tích hợp Backend OAuth thực tế).`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-20">
      {/* Left Visual */}
      <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full flex flex-col justify-end p-8 lg:p-16 overflow-hidden bg-surface-dark">
         <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1614951473789-72c0c169c273?q=80&w=2071&auto=format&fit=crop")'}}></div>
         <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-10"></div>
         
         <div className="relative z-20 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-6">
                <span className="material-symbols-outlined text-primary text-sm">3d_rotation</span>
                <span className="text-xs font-bold text-primary tracking-wide uppercase">Công nghệ Spatial Audio</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Trải nghiệm âm thanh <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">đa chiều sống động.</span>
            </h1>
         </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-background-dark">
        <div className="w-full max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">Chào mừng trở lại</h2>
                <p className="text-text-secondary text-sm">
                  Gợi ý: Dùng email <b>admin@admin.com</b> để vào trang quản lý sản phẩm.
                </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vidu@email.com"
                        required
                        className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Mật khẩu</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                    />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-border-dark bg-surface-dark text-primary focus:ring-primary" 
                        />
                        <span className="text-text-secondary">Ghi nhớ đăng nhập</span>
                    </label>
                    <a href="#" className="text-primary hover:text-white transition-colors">Quên mật khẩu?</a>
                </div>

                {/* Hiển thị lỗi nếu có */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm flex items-center gap-2 animate-[pulse_0.5s_ease-out]">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </div>
                )}

                <button 
                  disabled={isLoading}
                  className="mt-2 w-full h-12 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-[0_0_20px_rgba(17,50,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                            <span>Đang xử lý...</span>
                        </div>
                    ) : "Đăng nhập"}
                </button>
            </form>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border-dark"></div>
                <span className="flex-shrink mx-4 text-text-secondary text-xs font-medium uppercase tracking-wider">Hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-border-dark"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 h-10 rounded-lg bg-surface-dark border border-border-dark hover:bg-surface-highlight transition-all text-white text-sm font-medium"
                >
                    Google
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center justify-center gap-2 h-10 rounded-lg bg-surface-dark border border-border-dark hover:bg-surface-highlight transition-all text-white text-sm font-medium"
                >
                    Facebook
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;