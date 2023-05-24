import redis from 'redis';

const client = redis.createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

//Set a value
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
};

//get the value
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    if (err) {
    console.error('Error getting value:', err);
    } else {
    console.log(reply);
    }
  });
};

client.on('connect', () => {
  console.log('Redis client connected to the server');

  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
});
