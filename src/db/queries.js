const pool = require('./connection');

// Save assets to the database
const saveAssets = async (assets) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO "Asset" ("name", "collection", "stock", "floorPrice", "lastSale", "link", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (name) DO NOTHING;
    `;
    for (const asset of assets) {
        const floorPrice = asset.floor ? asset.floor.value : null; // Extract the numeric value or set to null
        const lastSale = asset.lastSale ? asset.lastSale.value * asset.lastSale.usd : null; // Extract the numeric value or set to null
        const updatedAt = new Date(); // Set the current timestamp
        const collection = asset.collection || null; // Set a default value if collection is not provided
        await client.query(query, [asset.name, collection, asset.stock, floorPrice, lastSale, asset.link, updatedAt]);
      }
  } catch (err) {
    console.error('Error saving assets:', err);
  } finally {
    client.release();
  }
};

// Retrieve all assets from the database
const getAssets = async () => {
  const { rows } = await pool.query('SELECT * FROM assets ORDER BY id ASC;');
  return rows;
};

module.exports = { saveAssets, getAssets };