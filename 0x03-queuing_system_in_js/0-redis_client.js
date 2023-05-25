import redis from 'redis';

const client = redis.createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('ready', () => {
  console.log('Redis client is ready');
});
