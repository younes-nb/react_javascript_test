const dotenv = require('dotenv');

// bringing env vars to the rest of app
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${port}...`);
});
