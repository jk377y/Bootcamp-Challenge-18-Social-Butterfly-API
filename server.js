require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./controllers");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set('strictQuery', true);  // silence deprecation warning in console

const dbName = 'SocialButterflyAPI'
const { connect, connection } = require('mongoose');
const connectionString = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${dbName}`;
connect(connectionString, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is connected at http://localhost:${PORT}`);
  });