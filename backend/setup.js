const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/transactionsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
  dateOfSale: Date
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Fetch data and initialize database
app.get('/api/initialize', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(response.data); // Insert fetched data
    res.status(200).send('Database initialized with seed data.');
  } catch (error) {
    res.status(500).json({ error: 'Error initializing database' });
  }
});
