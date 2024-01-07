const express = require('express');
const mongoose = require('mongoose'); // Fix the import statement
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const collection = mongoose.connection.collection('FoodItems');
    const cursor = collection.find({});
    const data = await cursor.toArray();

    res.json({ status: 'success', FoodItems: data });
  } catch (error) {
    console.log('An error occurred while fetching data:', error);
    res.json({ status: 'failure' });
  }
});

module.exports = router;
