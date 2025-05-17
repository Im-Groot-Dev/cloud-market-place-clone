
import React from 'react';
import { useCart } from '../hooks';
import { Button } from '@/components/ui/button';

const CartSummary = () => {
  const { items } = useCart();
  
  // Calculate total items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Estimated tax (for demo purposes: 10% of subtotal)
  const estimatedTax = subtotal * 0.1;
  
  // Shipping cost (free for orders over $35, otherwise $5.99)
  const shippingCost = subtotal > 35 ? 0 : 5.99;
  
  // Total order
  const total = subtotal + estimatedTax + shippingCost;

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-2 text-sm border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between">
          <span>Items ({itemCount}):</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Estimated tax:</span>
          <span>{formatCurrency(estimatedTax)}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Order total:</span>
        <span>{formatCurrency(total)}</span>
      </div>
      
      <Button className="w-full btn-amazon-primary">
        Proceed to Checkout
      </Button>
      
      <div className="mt-4 text-xs text-gray-500">
        <p className="mb-1">
          By placing your order, you agree to Amazon Clone's privacy notice and conditions of use.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
