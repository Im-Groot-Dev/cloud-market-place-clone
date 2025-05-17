
import { Product } from './global';

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Amazon Echo Dot (4th Gen)",
    description: "Meet the Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.7,
    reviews: 123456,
    inStock: true,
    primeEligible: true
  },
  {
    id: "2",
    title: "Fire TV Stick 4K streaming device",
    description: "Cinematic experience - Watch in vibrant 4K Ultra HD with support for Dolby Vision, HDR, and HDR10+.",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/61DnbR2P9-L._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.6,
    reviews: 98765,
    inStock: true,
    primeEligible: true
  },
  {
    id: "3",
    title: "Apple AirPods Pro (2nd Generation)",
    description: "The Apple-designed H2 chip pushes advanced audio performance to remarkable new heights.",
    price: 249.00,
    image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.7,
    reviews: 44961,
    inStock: true,
    primeEligible: true
  },
  {
    id: "4",
    title: "Kindle Paperwhite (8 GB)",
    description: "The thinnest, lightest Kindle Paperwhite yet—with a flush-front design and 300 ppi glare-free display that reads like real paper even in bright sunlight.",
    price: 139.99,
    image: "https://m.media-amazon.com/images/I/61PJusDPbML._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.5,
    reviews: 23271,
    inStock: true,
    primeEligible: true
  },
  {
    id: "5",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 FUNCTIONALITY: Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan and food warmer.",
    price: 99.95,
    image: "https://m.media-amazon.com/images/I/71WtwEvYDOS._AC_UY218_.jpg",
    category: "home",
    rating: 4.7,
    reviews: 164048,
    inStock: true,
    primeEligible: true
  },
  {
    id: "6",
    title: "The Lean Startup",
    description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
    price: 15.17,
    image: "https://m.media-amazon.com/images/I/51T-sMqSMiL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    category: "books",
    rating: 4.5,
    reviews: 11552,
    inStock: true,
    primeEligible: true
  },
  {
    id: "7",
    title: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 11.98,
    image: "https://m.media-amazon.com/images/I/51B7kuFwQFL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    category: "books",
    rating: 4.8,
    reviews: 66476,
    inStock: true,
    primeEligible: true
  },
  {
    id: "8",
    title: "Apple MacBook Air Laptop M2 chip",
    description: "13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera",
    price: 1099.00,
    image: "https://m.media-amazon.com/images/I/71S4sIPFvBL._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.7,
    reviews: 1104,
    inStock: true,
    primeEligible: true
  },
  {
    id: "9",
    title: "SAMSUNG 55-Inch Class QLED 4K LS03B Series",
    description: "The Frame Quantum HDR Smart TV with Alexa Built-in, Motion Rate 120, Object Tracking Sound Lite",
    price: 1497.99,
    image: "https://m.media-amazon.com/images/I/91S+Pw3OqSL._AC_UY218_.jpg",
    category: "electronics",
    rating: 4.5,
    reviews: 692,
    inStock: true,
    primeEligible: false
  },
  {
    id: "10",
    title: "Levi's Men's 505 Regular Fit Jeans",
    description: "The original zip fly, first created in 1967, features a straight leg with a regular fit through the seat and thigh.",
    price: 41.70,
    image: "https://m.media-amazon.com/images/I/91WmL+JnzpL._AC_UL320_.jpg",
    category: "clothing",
    rating: 4.5,
    reviews: 32857,
    inStock: true,
    primeEligible: true
  },
  {
    id: "11",
    title: "LEGO Icons Orchid 10311",
    description: "Build a beautiful displayable LEGO flower Orchid plant, with 5 leaves, 2 stems, 2 roots, 6 flowers and 2 buds, plus a blue fluted vase",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/81i0YvJF4RL._AC_UL320_.jpg",
    category: "toys",
    rating: 4.9,
    reviews: 8581,
    inStock: true,
    primeEligible: true
  },
  {
    id: "12",
    title: "Cards Against Humanity",
    description: "The party game for horrible people. Over 500 cards to create the funniest (and most offensive) combinations possible.",
    price: 29.00,
    image: "https://m.media-amazon.com/images/I/71IHxOryWHL._AC_UL320_.jpg",
    category: "toys",
    rating: 4.8,
    reviews: 67977,
    inStock: true,
    primeEligible: true
  },
];

// Get all products
export const getMockProducts = (): Product[] => {
  return mockProducts;
};

// Get a single product by ID
export const getMockProduct = (id?: string): Product | Product[] => {
  if (!id) return mockProducts;
  return mockProducts.find(p => p.id === id) || mockProducts[0];
};

// Get products by category
export const getMockProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

// Search products
export const searchMockProducts = (query: string): Product[] => {
  const searchQuery = query.toLowerCase();
  return mockProducts.filter(
    p => p.title.toLowerCase().includes(searchQuery) || 
         p.description.toLowerCase().includes(searchQuery)
  );
};
