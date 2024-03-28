const express = require("express");
const app = express();
require("dotenv").config(); // loads .env variables
const cors = require('cors');


const { PORT, CLIENT_URL, API_KEY, DB_NAME, DB_PASSWORD } = process.env;
const parkingRoutes = require('./routes/parking-routes');
const userRoutes = require('./routes/user-routes');

app.use(cors());
app.use(express.json()); 
app.use('/api/parking', parkingRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
  