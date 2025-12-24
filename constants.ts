import { Product } from './types';

export const FEATURED_PRODUCT: Product = {
  id: 1,
  name: "Sonic Master X1",
  category: "Headphones",
  price: 1299,
  originalPrice: 1499,
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
  description: "Experience sound like never before with our flagship open-back drivers. Engineered for audiophiles who demand precision. Crafted from aerospace-grade aluminum and genuine lambskin leather.",
  features: ["High-Res Audio", "Detachable Cable", "Open-Back Design"],
  rating: 4.8,
  reviews: 124
};

export const PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Over-Ear Studio X1",
    category: "Studio",
    price: 899,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
    description: "Professional studio reference headphones.",
    features: [],
    isNew: true
  },
  {
    id: 102,
    name: "Earbuds Pro ANC",
    category: "Wireless",
    price: 259,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    description: "Active noise cancelling with 24h battery.",
    features: [],
    rating: 4.5
  },
  {
    id: 103,
    name: "Speaker Boom 360",
    category: "Speakers",
    price: 155,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop",
    description: "Powerful bass in a compact cylinder.",
    features: [],
    isSale: true
  },
  {
    id: 104,
    name: "Classic Wood Series",
    category: "Headphones",
    price: 420,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop",
    description: "Vintage design with modern sound profiles.",
    features: []
  }
];