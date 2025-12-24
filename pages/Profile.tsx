import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => Promise<void>;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Ref cho input file ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [formData, setFormData] = useState<User>(user);

  // Sync state when prop user changes
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Xử lý upload ảnh
  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Kiểm tra kích thước (ví dụ: giới hạn 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("Vui lòng chọn ảnh nhỏ hơn 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({ ...prev, avatar: base64String }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateUser(formData);
      setIsEditing(false);
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu thông tin.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen pb-12 bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Hồ sơ cá nhân</h1>
          <p className="text-text-secondary">Quản lý thông tin và cài đặt tài khoản của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="md:col-span-1">
             <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 flex flex-col items-center text-center sticky top-24">
                <div className="relative w-32 h-32 mb-4 group">
                   <div 
                     className={`w-full h-full rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 ${isEditing ? 'cursor-pointer' : ''}`}
                     onClick={handleAvatarClick}
                     title={isEditing ? "Bấm để đổi ảnh" : ""}
                   >
                      <div className="w-full h-full rounded-full bg-surface-dark flex items-center justify-center overflow-hidden relative">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl font-bold text-white">{formData.name.charAt(0).toUpperCase()}</span>
                        )}
                        
                        {/* Overlay khi hover trong chế độ sửa */}
                        {isEditing && (
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <span className="material-symbols-outlined text-white">photo_camera</span>
                             </div>
                        )}
                      </div>
                   </div>
                   
                   {/* Input File Ẩn */}
                   <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                   />

                   {isEditing && (
                     <button 
                        type="button"
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover shadow-lg transition-colors border-2 border-surface-dark"
                     >
                        <span className="material-symbols-outlined text-sm">edit</span>
                     </button>
                   )}
                </div>
                
                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-text-secondary uppercase tracking-wider mb-6">
                  {user.role}
                </span>

                <div className="w-full border-t border-border-dark pt-6 space-y-4">
                   <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Thành viên từ</span>
                      <span className="text-white font-medium">{user.joinedDate || '2024-01-01'}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Trạng thái</span>
                      <span className="text-green-500 font-medium">Đang hoạt động</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Details Form */}
          <div className="md:col-span-2">
             <div className="bg-surface-dark border border-border-dark rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-bold text-white">Thông tin chi tiết</h3>
                   {!isEditing ? (
                     <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors font-medium text-sm"
                     >
                        <span className="material-symbols-outlined text-[18px]">edit_square</span>
                        Chỉnh sửa
                     </button>
                   ) : (
                     <button 
                        onClick={() => { setIsEditing(false); setFormData(user); }} // Cancel edits
                        className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors font-medium text-sm"
                     >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                        Hủy bỏ
                     </button>
                   )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-text-secondary text-sm font-medium">Họ và tên</label>
                         <input 
                            name="name"
                            type="text" 
                            disabled={!isEditing}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-text-secondary text-sm font-medium">Email</label>
                         <input 
                            name="email"
                            type="email" 
                            disabled={true} // Email thường không cho sửa dễ dàng
                            value={formData.email}
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-text-secondary/70 cursor-not-allowed outline-none"
                            title="Không thể thay đổi email"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-text-secondary text-sm font-medium">Số điện thoại</label>
                         <input 
                            name="phone"
                            type="tel" 
                            disabled={!isEditing}
                            value={formData.phone || ''}
                            onChange={handleChange}
                            placeholder="Chưa cập nhật"
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-text-secondary text-sm font-medium">Chức vụ</label>
                         <input 
                            type="text" 
                            disabled={true}
                            value={formData.role === 'admin' ? 'Quản trị viên' : 'Khách hàng thân thiết'}
                            className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-text-secondary/70 cursor-not-allowed outline-none"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-text-secondary text-sm font-medium">Địa chỉ giao hàng</label>
                      <input 
                         name="address"
                         type="text" 
                         disabled={!isEditing}
                         value={formData.address || ''}
                         onChange={handleChange}
                         placeholder="Chưa cập nhật địa chỉ"
                         className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      />
                   </div>

                   {isEditing && (
                      <div className="pt-4 flex justify-end gap-4 animate-[float_0.3s_ease-out]">
                         <button 
                           type="submit"
                           disabled={isSaving}
                           className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                         >
                            {isSaving ? (
                               <>
                                 <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                                 Đang lưu...
                               </>
                            ) : (
                               <>
                                 <span className="material-symbols-outlined text-sm">save</span>
                                 Lưu thay đổi
                               </>
                            )}
                         </button>
                      </div>
                   )}
                </form>
             </div>

             {/* Settings Section (Visual only for now) */}
             <div className="mt-8 bg-surface-dark border border-border-dark rounded-2xl p-8 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <h3 className="text-lg font-bold text-white mb-4">Cài đặt bảo mật</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-background-dark rounded-xl border border-border-dark">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-text-secondary">lock</span>
                         <div>
                            <p className="text-white font-medium">Đổi mật khẩu</p>
                            <p className="text-xs text-text-secondary">Cập nhật mật khẩu định kỳ để bảo mật</p>
                         </div>
                      </div>
                      <button className="text-sm font-bold text-primary hover:underline">Cập nhật</button>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-background-dark rounded-xl border border-border-dark">
                      <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-text-secondary">phonelink_lock</span>
                         <div>
                            <p className="text-white font-medium">Xác thực 2 lớp (2FA)</p>
                            <p className="text-xs text-text-secondary">Tăng cường bảo mật cho tài khoản</p>
                         </div>
                      </div>
                      <div className="w-10 h-5 bg-border-dark rounded-full relative cursor-pointer">
                         <div className="absolute left-1 top-1 w-3 h-3 bg-text-secondary rounded-full"></div>
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

export default Profile;