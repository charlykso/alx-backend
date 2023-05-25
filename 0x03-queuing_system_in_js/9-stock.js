//Data
const listProducts = [
  {Id: 1, name: 'Suitcase 250', price: 50, stock: 4},
  {Id: 2, name: 'Suitcase 450', price: 100, stock: 10},
  {Id: 3, name: 'Suitcase 650', price: 350, stock: 2},
  {Id: 4, name: 'Suitcase 1050', price: 550, stock: 5}
];

//Data access
const getItemById = (id) => {
  const product = listProducts.find((product) => product.Id == id)
  return(product);
}

const express = require('express');
const app = express();
const port = 1245;


const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const redisClient = redis.createClient();

// Promisify Redis commands
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

// Function to reserve stock by item ID
const reserveStockById = (itemId, stock) => {
  const key = `item.${itemId}`;
  redisClient.set(key, stock, (err, reply) => {
    if (err) {
      console.error(`Error reserving stock for item ${itemId}:`, err);
    } else {
      console.log(`Stock reserved for item ${itemId}:`, stock);
    }
  });
}

// Async function to get the current reserved stock by item ID
const getCurrentReservedStockById = async (itemId) => {
  const key = `item.${itemId}`;
  const reservedStock = await getAsync(key);
  return parseInt(reservedStock) || 0;
}

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// GET /list_products route
app.get('/list_products', (req, res) => {
  res.json(listProducts)
})


// GET /list_products/:itemId route
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const product = getItemById(itemId)
  // console.log(itemId);
  if (product) {
    try {
      const reservedStock = await getCurrentReservedStockById(itemId);
      const availableStock = product.stock - reservedStock;

      const result = {
        product: product,
        stock: availableStock
      };
      res.json(result)
    } catch (error) {
      console.error('Error getting current stock:', error);
      res.status(500).json({ error: 'Failed to get current stock' });
    }
  }else{
    res.status(404).json({ status: 'Product not found' });
  }
})

//GET /reserve_product/:itemId route
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const product = getItemById(itemId);
  if (product) {
    try {
      if (product.stock < 1) {
        res.json({"status":"Not enough stock available","itemId":itemId})
      }else{
        await reserveStockById(itemId)
        res.json({"status":"Reservation confirmed","itemId":itemId})
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed' });
    }
  }else{
    res.status(404).json({"status":"Product not found"})
  }
}) 

//start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
