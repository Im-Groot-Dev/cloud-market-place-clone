
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-amazon-dark text-white mt-8">
      {/* Back to top button */}
      <div className="bg-amazon-primary hover:bg-opacity-90 transition-colors text-center p-3 cursor-pointer">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
      </div>

      {/* Main footer links */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold mb-2">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Press Releases</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Science</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Sell products on Amazon</Link></li>
              <li><Link to="#" className="hover:underline">Sell on Amazon Business</Link></li>
              <li><Link to="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="#" className="hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Amazon Business Card</Link></li>
              <li><Link to="#" className="hover:underline">Shop with Points</Link></li>
              <li><Link to="#" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Currency Converter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Your Account</Link></li>
              <li><Link to="#" className="hover:underline">Your Orders</Link></li>
              <li><Link to="#" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="#" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo and copyright */}
      <div className="border-t border-gray-700 py-6 text-center">
        <div className="mb-2">
          <span className="text-amazon-secondary text-2xl font-bold">amazon</span>
          <span className="text-white text-xs">.clone</span>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Amazon Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
