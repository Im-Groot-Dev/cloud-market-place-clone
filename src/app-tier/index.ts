
import express from 'express';
import cors from 'cors';
import { ProductService, OrderService, UserService } from './TransactionService';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error in GET /api/products/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await ProductService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    console.error(`Error in GET /api/products/category/${req.params.category}:`, error);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

app.get('/api/products/search', async (req, res) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    const products = await ProductService.searchProducts(query);
    res.json(products);
  } catch (error) {
    console.error(`Error in GET /api/products/search?q=${query}:`, error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Orders endpoints (protected, would require auth in real app)
app.post('/api/orders', async (req, res) => {
  const { userId, items, shippingAddress } = req.body;
  
  if (!userId || !items || !shippingAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const result = await OrderService.createOrder(userId, items, shippingAddress);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  // In a real app, userId would come from the authenticated session
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  try {
    const order = await OrderService.getOrderById(req.params.id, userId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(`Error in GET /api/orders/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// User endpoints (protected, would require auth in real app)
app.get('/api/users/:id', async (req, res) => {
  // In a real app, we'd verify the authenticated user matches the requested userId
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error in GET /api/users/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  // In a real app, we'd verify the authenticated user matches the requested userId
  try {
    const result = await UserService.updateUserProfile(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error(`Error in PUT /api/users/${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
