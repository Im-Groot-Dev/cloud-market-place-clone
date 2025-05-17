
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, clearCart } = useCart();
  
  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 mt-8">
        <div className="text-center">
          <div className="flex justify-center">
            <ShoppingCart className="h-24 w-24 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-2">Your Amazon Cart is empty</h2>
          <p className="text-gray-600 mb-4">
            Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.
          </p>
          <Button asChild className="btn-amazon-primary">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="ghost" 
          onClick={clearCart}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Clear cart
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-md shadow-sm">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="md:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
