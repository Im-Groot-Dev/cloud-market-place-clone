
// Mock database configuration
// In a real application, this would connect to a real database
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'amazon_clone',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

export const getDbConnection = () => {
  console.log('Connecting to database with config:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
  });
  
  // In a real application, this would return a database client
  return {
    query: async (text: string, params?: any[]) => {
      console.log('Executing query:', text, params);
      
      // This is just a mock function
      return {
        rows: [],
        rowCount: 0
      };
    },
    release: () => {
      console.log('Releasing connection');
    }
  };
};
