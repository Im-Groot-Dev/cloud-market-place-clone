import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../global';
import { useCart } from '../hooks';
import { getMockProduct, getMockProducts } from '../mock-data';
import { Button } from '@/components/ui/button';
import ProductGrid from '../components/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      // In a real app, fetch from API
      const fetchedProduct = getMockProduct(id);
      
      // Make sure we're setting a single product, not an array
      if (Array.isArray(fetchedProduct)) {
        setProduct(fetchedProduct[0]);
      } else {
        setProduct(fetchedProduct);
      }

      // Get related products (mock)
      const allProducts = getMockProducts();
      
      // Only filter related products if we have a valid product with category
      if (product && product.category) {
        const related = allProducts.filter(p => 
          p.category === product.category && p.id !== id
        ).slice(0, 4);
        setRelatedProducts(related);
      } else {
        // Just get some products if we can't find related ones
        setRelatedProducts(allProducts.slice(0, 4));
      }
      
      setLoading(false);
    }
  }, [id, product?.category]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-4">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/products" className="text-blue-600 hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* Breadcrumb */}
      <div className="flex text-sm mb-4 text-gray-600">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:underline">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product?.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-6 flex items-center justify-center">
          <img 
            src={product?.image} 
            alt={product?.title} 
            className="max-h-96 object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product?.reviews} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold">{product ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(product.price) : '$0.00'}</span>
          </div>
          
          {/* Availability */}
          <div className="mt-4">
            {product?.inStock ? (
              <div className="flex items-center text-green-600">
                <Check className="h-5 w-5 mr-1" />
                <span>In Stock</span>
              </div>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
            
            {product?.primeEligible && (
              <div className="mt-1 flex items-center">
                <span className="text-blue-600 font-bold mr-1">Prime</span>
                <span className="text-gray-700">Free Delivery</span>
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">About this item</h3>
            <p className="text-gray-700">{product?.description}</p>
          </div>
          
          {/* Add to Cart */}
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">Quantity:</label>
              <select 
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <Button 
              onClick={() => product && addToCart(product, quantity)}
              className="btn-amazon-primary w-full md:w-auto flex items-center justify-center"
              disabled={!product?.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductGrid products={relatedProducts} title="Customers also viewed" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
