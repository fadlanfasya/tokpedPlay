require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoStr = process.env.DATABASE_URL

mongoose.connect(mongoStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

const app = express();

const routes = require('./routes/routes.js');
app.use(express.json());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`)
})