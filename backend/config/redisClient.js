const redis = require('redis');

// Create a Redis client
const client = redis.createClient(
  {
        host: '55963ae7e2c0f96f32532a84e113ca015b686bdca0b7279cb9402da5e4e77b64', // Redis server host (change if needed)
        port: 6379, }
);
  
// Handle Redis connection errors
client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Connect to Redis
client.connect().then(() => {
  console.log('Connected to Redis server');
});

module.exports = client;
