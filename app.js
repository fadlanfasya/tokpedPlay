const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//Routes
const routes = require('./routes/routes.js');
app.use('/api', routes);

//Error Handler
const errorHandler = require('./handlers/errorHandler');
app.use(errorHandler.notFound);
app.use(errorHandler.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandler.developmentErrors);
} else {
    app.use(errorHandler.productionErrors);
}

module.exports = app