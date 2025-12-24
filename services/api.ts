import { Product, User } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../constants';

const DELAY = 800; // Giả lập độ trễ mạng 800ms
const KEYS = {
  PRODUCTS: 'audiotech_products',
  USER: 'audiotech_user', // Key for LocalStorage (Remember Me)
  USER_SESSION: 'audiotech_user_session', // Key for SessionStorage (No Remember)
  USERS_DB: 'audiotech_users_db' // Simulated Database of registered users
};

// Hàm tiện ích giả lập chờ mạng
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- PRODUCT SERVICES ---
  
  getProducts: async (): Promise<Product[]> => {
    await sleep(DELAY);
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    if (!stored) {
      // Nếu chưa có dữ liệu, lưu dữ liệu mẫu vào LocalStorage
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  addProduct: async (product: Product): Promise<Product> => {
    await sleep(DELAY);
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    const currentProducts: Product[] = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    
    const newProduct = { ...product, id: Date.now() }; // Tạo ID mới
    const updatedProducts = [newProduct, ...currentProducts];
    
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updatedProducts));
    return newProduct;
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    await sleep(DELAY);
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    const currentProducts: Product[] = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updatedProducts));
    return true;
  },

  // --- AUTH SERVICES ---

  login: async (email: string, password: string, remember: boolean = false): Promise<User> => {
    await sleep(DELAY);
    
    let userToLogin: User | null = null;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check Hardcoded Admin
    if (normalizedEmail === 'admin@admin.com') {
        // Simple admin check (in real app, check password too)
       userToLogin = { 
         email: 'admin@admin.com', 
         name: 'Administrator', 
         role: 'admin',
         phone: '0909000111',
         address: 'Headquarter, AudioTech Tower',
         joinedDate: '2023-01-01'
       };
    } else {
        // 2. Check "Database" (LocalStorage) for registered users
        const usersDb = localStorage.getItem(KEYS.USERS_DB);
        if (usersDb) {
            const users = JSON.parse(usersDb);
            // Tìm user với email (không phân biệt hoa thường) và password (chính xác)
            const foundUser = users.find((u: any) => 
                u.email.toLowerCase().trim() === normalizedEmail && 
                u.password === password
            );
            
            if (foundUser) {
                const { password: _, ...userSafeData } = foundUser;
                userToLogin = userSafeData as User;
            }
        }
    }

    // 3. STRICT CHECK
    if (!userToLogin) {
        throw new Error("Email hoặc mật khẩu không chính xác.");
    }

    // LƯU TRỮ PHIÊN ĐĂNG NHẬP
    if (remember) {
        localStorage.setItem(KEYS.USER, JSON.stringify(userToLogin));
        sessionStorage.removeItem(KEYS.USER_SESSION);
    } else {
        sessionStorage.setItem(KEYS.USER_SESSION, JSON.stringify(userToLogin));
        localStorage.removeItem(KEYS.USER);
    }

    return userToLogin;
  },

  register: async (userInfo: any): Promise<boolean> => {
    await sleep(DELAY + 500); 

    const usersDb = localStorage.getItem(KEYS.USERS_DB);
    const users = usersDb ? JSON.parse(usersDb) : [];

    const normalizedEmail = userInfo.email.toLowerCase().trim();

    // Check duplicate email
    if (users.some((u: any) => u.email.toLowerCase().trim() === normalizedEmail)) {
      throw new Error("Email này đã được đăng ký.");
    }

    const newUser = {
      name: userInfo.name,
      email: normalizedEmail, // Save normalized email
      password: userInfo.password, // Keep password as is
      role: 'user',
      phone: '',
      address: '',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: ''
    };

    users.push(newUser);
    localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));

    console.log("Registered user saved to DB:", newUser);
    return true;
  },

  updateProfile: async (updatedUser: User): Promise<User> => {
    await sleep(DELAY);
    
    // 1. Cập nhật Session hiện tại
    if (localStorage.getItem(KEYS.USER)) {
        localStorage.setItem(KEYS.USER, JSON.stringify(updatedUser));
    } else {
        sessionStorage.setItem(KEYS.USER_SESSION, JSON.stringify(updatedUser));
    }

    // 2. Cập nhật trong "Database"
    const usersDb = localStorage.getItem(KEYS.USERS_DB);
    if (usersDb) {
      const users = JSON.parse(usersDb);
      const index = users.findIndex((u: any) => u.email === updatedUser.email);
      if (index !== -1) {
        // Preserve password when updating other fields
        const currentPassword = users[index].password;
        users[index] = { ...users[index], ...updatedUser, password: currentPassword };
        localStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
      }
    }

    return updatedUser;
  },

  logout: async () => {
    await sleep(500);
    localStorage.removeItem(KEYS.USER);
    sessionStorage.removeItem(KEYS.USER_SESSION);
  },

  getCurrentUser: (): User | null => {
    const sessionUser = sessionStorage.getItem(KEYS.USER_SESSION);
    if (sessionUser) return JSON.parse(sessionUser);

    const localUser = localStorage.getItem(KEYS.USER);
    if (localUser) return JSON.parse(localUser);

    return null;
  }
};