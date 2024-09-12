const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const REDIS_URL = process.env.REDIS_URL;

// Connect to MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Redis client
const redisClient = redis.createClient({ url: REDIS_URL });

app.get('/', (req, res) => {
  res.send('Welcome to the Real-Time App!');
});

app.listen(3000, () => {
  console.log('Node app listening on port 3000');
});
