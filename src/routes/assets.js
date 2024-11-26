const express = require('express');
const axios = require('axios');
const { saveAssets, getAssets } = require('../db/queries');
require('dotenv').config();

const router = express.Router();
const assetName = "BLAINEPEPE";

// Fetch data from external API and save to the database
router.get('/fetch-and-save', async (req, res) => {
  console.log('GET /api/assets/fetch-and-save');
  try {
    //const response = await axios.get(`${process.env.API_URL}${assetName}`);
    const response = await axios.get(`${process.env.API_URL}`);
    //console.log(`${process.env.API_URL}${assetName}`);
    const assets = response.data;
    // Ensure assets is an array
    const assetsArray = Array.isArray(assets) ? assets : [assets];
    console.log(Array.isArray(assetsArray));
    // Save assets to the database
    await saveAssets(assetsArray);

    res.status(200).json({ message: 'Assets fetched and saved successfully.' });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets.' });
  }
});

// Get all assets from the database
router.get('/', async (req, res) => {
  console.log('GET /api/assets');
  try {
    const assets = await getAssets();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching assets from database:', error);
    res.status(500).json({ error: 'Failed to retrieve assets.' });
  }
});

module.exports = router;