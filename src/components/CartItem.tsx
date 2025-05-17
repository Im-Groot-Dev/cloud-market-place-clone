
import React from 'react';
import { CartProduct } from '../global';
import { Minus, Plus, Trash } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity);
    }
  };

  // Format price with 2 decimal places and comma separators
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  // Calculate total for this item
  const itemTotal = product.price * quantity;
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(itemTotal);

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-32 md:h-32 mb-4 md:mb-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 md:ml-4">
          <h3 className="font-medium text-lg">{product.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
          
          {product.inStock ? (
            <p className="text-sm text-green-600 mt-1">In Stock</p>
          ) : (
            <p className="text-sm text-red-600 mt-1">Out of Stock</p>
          )}
          
          {product.primeEligible && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-blue-600">Prime</span>
              <span className="text-xs text-gray-600 ml-1">Free Delivery</span>
            </div>
          )}
          
          <div className="mt-4 flex flex-wrap items-center gap-6">
            {/* Price */}
            <div>
              <span className="font-bold">{formattedPrice}</span>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 rounded-l-md rounded-r-none" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="h-8 px-3 flex items-center justify-center border-t border-b border-gray-200">
                {quantity}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 rounded-r-md rounded-l-none" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Item Total */}
            <div>
              <span className="text-sm text-gray-500">Total: </span>
              <span className="font-bold">{formattedTotal}</span>
            </div>
            
            {/* Delete Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:text-red-800 hover:bg-red-50" 
              onClick={() => removeFromCart(product.id)}
            >
              <Trash className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
