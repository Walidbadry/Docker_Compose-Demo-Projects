const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3002;

const mongoUrl = process.env.MONGO_URL;
let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }

  db = client.db('node_mongo_db');
  console.log('Connected to MongoDB');
});

// Simple route to fetch all documents from a collection
app.get('/', async (req, res) => {
  try {
    const collection = db.collection('test');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err) {
    res.status(500).send('Error retrieving documents');
  }
});

// Insert a test document into the collection
app.get('/insert', async (req, res) => {
  try {
    const collection = db.collection('test');
    await collection.insertOne({ message: 'Hello from MongoDB!' });
    res.send('Document inserted!');
  } catch (err) {
    res.status(500).send('Error inserting document');
  }
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
