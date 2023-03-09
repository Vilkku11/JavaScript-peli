const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const scoreRouter = require('./controllers/scoreRouter')
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => {
        console.log('Error connecting to mongodb', e.message);
    })

app.use('/api/scores', scoreRouter)


module.exports = app