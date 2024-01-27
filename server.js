require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => console.log('Error connecting to database:', error));

database.once('connected', () => console.log('Database connected'));

app.use(express.json());
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening at http:/localhost:${PORT}`));