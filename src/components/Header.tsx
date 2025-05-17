
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../hooks';

const Header = () => {
  const { items } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header */}
      <div className="bg-amazon-dark text-white p-2 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="mr-4">
          <div className="flex items-center">
            <span className="text-amazon-secondary text-2xl font-bold">amazon</span>
            <span className="text-white text-xs">.clone</span>
          </div>
        </Link>

        {/* Search Bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-4">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="flex flex-1 bg-white rounded-l-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="search-input px-4 py-2 rounded-l-md"
              />
            </div>
            <button 
              type="submit" 
              className="bg-amazon-secondary hover:bg-amazon-accent px-4 rounded-r-md flex items-center"
            >
              <Search className="h-5 w-5 text-amazon-dark" />
            </button>
          </form>
        </div>

        {/* Right Nav Links */}
        <nav className="flex items-center space-x-6">
          <Link to="/account" className="hidden md:flex flex-col header-nav-link">
            <span className="text-xs">Hello, Sign In</span>
            <span className="font-bold">Account & Lists</span>
          </Link>

          <Link to="/orders" className="hidden md:flex flex-col header-nav-link">
            <span className="text-xs">Returns</span>
            <span className="font-bold">& Orders</span>
          </Link>

          <Link to="/cart" className="flex items-center header-nav-link">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-amazon-secondary text-black font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            </div>
            <span className="hidden md:inline ml-1 font-bold">Cart</span>
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="bg-amazon-dark p-2 md:hidden">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="flex flex-1 bg-white rounded-l-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="search-input px-4 py-2 rounded-l-md"
            />
          </div>
          <button 
            type="submit" 
            className="bg-amazon-secondary hover:bg-amazon-accent px-4 rounded-r-md flex items-center"
          >
            <Search className="h-5 w-5 text-amazon-dark" />
          </button>
        </form>
      </div>

      {/* Navigation Bar */}
      <div className="bg-amazon-primary text-white p-2 px-4 flex items-center text-sm">
        <div className="flex items-center space-x-4 overflow-x-auto w-full scrollbar-hide">
          <Link to="/products" className="whitespace-nowrap header-nav-link">All Products</Link>
          <Link to="/category/electronics" className="whitespace-nowrap header-nav-link">Electronics</Link>
          <Link to="/category/clothing" className="whitespace-nowrap header-nav-link">Clothing</Link>
          <Link to="/category/books" className="whitespace-nowrap header-nav-link">Books</Link>
          <Link to="/category/home" className="whitespace-nowrap header-nav-link">Home & Kitchen</Link>
          <Link to="/category/toys" className="whitespace-nowrap header-nav-link">Toys & Games</Link>
          <Link to="/deals" className="whitespace-nowrap header-nav-link">Today's Deals</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-amazon-dark text-white p-4 md:hidden animate-fade-in">
          <Link to="/account" className="block py-2 header-nav-link">Account & Lists</Link>
          <Link to="/orders" className="block py-2 header-nav-link">Returns & Orders</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
