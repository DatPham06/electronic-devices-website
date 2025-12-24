import React, { useState } from 'react';
import { api } from '../services/api';

interface RegisterProps {
    onRegisterSuccess: () => void;
    onGoToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  // State quản lý form
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
      // Xóa lỗi khi người dùng gõ lại
      if (error) setError('');
  };

  // Xử lý submit
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const email = formData.email.trim();
      const lastName = formData.lastName.trim();
      const firstName = formData.firstName.trim();
      const password = formData.password;
      const confirmPassword = formData.confirmPassword;

      // 1. Validate cơ bản
      if (!firstName || !lastName || !email || !password) {
          setError("Vui lòng điền đầy đủ thông tin.");
          return;
      }

      if (password !== confirmPassword) {
          setError("Mật khẩu xác nhận không khớp.");
          return;
      }

      if (password.length < 6) {
          setError("Mật khẩu phải có ít nhất 6 ký tự.");
          return;
      }

      setIsLoading(true);

      try {
          // 2. Gọi API đăng ký
          await api.register({
              name: `${lastName} ${firstName}`,
              email: email,
              password: password
          });
          
          alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
          onRegisterSuccess();

      } catch (err: any) {
          setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-20">
      {/* Left Visual */}
      <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full flex flex-col justify-end p-8 lg:p-16 overflow-hidden bg-surface-dark order-last lg:order-first">
         <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop")'}}></div>
         <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-10"></div>
         
         <div className="relative z-20 max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Tham gia cộng đồng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AudioTech Elite.</span>
            </h1>
            <p className="text-text-secondary mt-4">Nhận ưu đãi độc quyền, bảo hành mở rộng và cập nhật công nghệ mới nhất.</p>
         </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-background-dark">
        <div className="w-full max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white">Tạo tài khoản mới</h2>
                <p className="text-text-secondary text-sm">Điền thông tin bên dưới để đăng ký</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                      <label className="text-white text-sm font-medium">Họ</label>
                      <input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Nguyễn"
                          className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                      />
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                      <label className="text-white text-sm font-medium">Tên</label>
                      <input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Văn A"
                          className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                      />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Email</label>
                    <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="vidu@email.com"
                        className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Mật khẩu</label>
                    <input 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password" 
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                    />
                </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-white text-sm font-medium">Xác nhận mật khẩu</label>
                    <input 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type="password" 
                        placeholder="Nhập lại mật khẩu"
                        className="w-full h-12 rounded-lg bg-surface-dark border border-border-dark px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-secondary/50"
                    />
                </div>
                
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </div>
                )}

                <div className="flex items-start gap-2 mt-2">
                    <input type="checkbox" required className="mt-1 rounded border-border-dark bg-surface-dark text-primary focus:ring-primary" />
                    <span className="text-text-secondary text-sm">Tôi đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-primary hover:underline">Chính sách bảo mật</a>.</span>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full h-12 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-[0_0_20px_rgba(17,50,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                            Đang xử lý...
                        </>
                    ) : "Đăng ký tài khoản"}
                </button>
            </form>
            
            <p className="text-center text-text-secondary text-sm">
              Đã có tài khoản? <button onClick={onGoToLogin} className="text-primary font-bold hover:underline">Đăng nhập ngay</button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;