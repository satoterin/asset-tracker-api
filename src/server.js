const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const pool = require('./db/connection');

// Check database connection
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Database connected:', result.rows);
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
