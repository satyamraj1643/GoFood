const express = require('express');
const { mongoose } = require('mongoose')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const collection = mongoose.connection.collection('FoodCategory');
    const data = await collection.find({}).toArray();

    res.json({ status: 'success', FoodCategory: data });
  } catch (error) {
    console.log('An error occurred while fetching data:', error);
    res.json({ status: 'failure' });
  }
});

module.exports = router;
