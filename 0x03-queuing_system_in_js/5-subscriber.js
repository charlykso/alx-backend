const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  url: 'http://127.0.0.1:6379',
});

// Redis client event handlers
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error('Redis client not connected to the server:', error.message);
});

// Subscribe to the channel "holberton school channel"
client.subscribe('holberton school channel');

// Message event handler
client.on('message', (channel, message) => {
  console.log(`${message}`);

  if (message === 'KILL_SERVER') {
    // Unsubscribe and quit when the message is "KILL_SERVER"
    client.unsubscribe();
    client.quit();
  }
});
