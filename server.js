const express = require("express");
const app = express();
require("dotenv").config(); // loads .env variables

const { PORT, CLIENT_URL, API_KEY, DB_NAME, DB_PASSWORD } = process.env;

app.get("/", (req, res) => {
    res.send("Hello, World");
  });

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
  