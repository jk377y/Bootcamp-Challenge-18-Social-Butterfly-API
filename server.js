const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.createConnection('mongodb://localhost:27017/Social-Butterfly-API', {
	useNewUrlParser: true,
})
const db = mongoose.connection;

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());

const routes = require('./routes');
app.use('/', routes);

app.listen(3001, () => console.log(`Server is connected at http://localhost:3001`)
)
