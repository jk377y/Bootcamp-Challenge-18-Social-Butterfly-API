const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// this is the connection to the database 
mongoose.connect('mongodb://localhost/Social-Butterfly-API', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// used to show debugging information in the console
mongoose.set('debug', true); 

// this is the connection to the server with verification that it is connected in the console
app.listen(PORT, () => console.log(`Server is connected at http://localhost:${PORT}`));