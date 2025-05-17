
import { getDbConnection } from './DbConfig';

// Service to handle product-related operations
export const ProductService = {
  // Get all products
  getAllProducts: async () => {
    const client = getDbConnection();
    try {
      const result = await client.query('SELECT * FROM products');
      return result.rows;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get a product by ID
  getProductById: async (id: string) => {
    const client = getDbConnection();
    try {
      const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    const client = getDbConnection();
    try {
      const result = await client.query('SELECT * FROM products WHERE category = $1', [category]);
      return result.rows;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    } finally {
      client.release();
    }
  },

  // Search products
  searchProducts: async (query: string) => {
    const client = getDbConnection();
    try {
      const searchPattern = `%${query}%`;
      const result = await client.query(
        'SELECT * FROM products WHERE title ILIKE $1 OR description ILIKE $1',
        [searchPattern]
      );
      return result.rows;
    } catch (error) {
      console.error(`Error searching for products with query "${query}":`, error);
      throw error;
    } finally {
      client.release();
    }
  }
};

// Service to handle order-related operations
export const OrderService = {
  // Create a new order
  createOrder: async (userId: string, items: Array<{productId: string, quantity: number}>, shippingAddress: any) => {
    const client = getDbConnection();
    try {
      // Start transaction
      await client.query('BEGIN');
      
      // Create order in orders table
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, status, shipping_address) VALUES ($1, $2, $3) RETURNING id',
        [userId, 'pending', shippingAddress]
      );
      
      const orderId = orderResult.rows[0].id;
      
      // Add order items
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)',
          [orderId, item.productId, item.quantity]
        );
      }
      
      // Commit transaction
      await client.query('COMMIT');
      
      return { orderId, success: true };
    } catch (error) {
      // Rollback in case of error
      await client.query('ROLLBACK');
      console.error('Error creating order:', error);
      throw error;
    } finally {
      client.release();
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string, userId: string) => {
    const client = getDbConnection();
    try {
      const orderResult = await client.query(
        'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
        [orderId, userId]
      );
      
      if (orderResult.rowCount === 0) {
        return null;
      }
      
      const order = orderResult.rows[0];
      
      // Get order items
      const itemsResult = await client.query(
        `SELECT oi.product_id, oi.quantity, p.title, p.price, p.image
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [orderId]
      );
      
      order.items = itemsResult.rows;
      
      return order;
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    } finally {
      client.release();
    }
  }
};

// Service to handle user-related operations
export const UserService = {
  // Get user by ID
  getUserById: async (userId: string) => {
    const client = getDbConnection();
    try {
      const result = await client.query(
        'SELECT id, email, name, created_at FROM users WHERE id = $1',
        [userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    } finally {
      client.release();
    }
  },

  // Update user profile
  updateUserProfile: async (userId: string, profileData: any) => {
    const client = getDbConnection();
    try {
      const { name, email, address } = profileData;
      const result = await client.query(
        'UPDATE users SET name = $1, email = $2, address = $3 WHERE id = $4 RETURNING id',
        [name, email, address, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating profile for user ${userId}:`, error);
      throw error;
    } finally {
      client.release();
    }
  }
};
