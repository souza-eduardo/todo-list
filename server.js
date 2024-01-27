require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => console.log(error));

database.once('connected', () => console.log('Database connected'));

app.use(express.json());

const routes = require('./routes/routes');

app.use('/', routes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening at http:/localhost:${PORT}`));