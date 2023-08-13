const express = require('express');
const app = express();

// dotenv
require('dotenv').config();
// cors
const cors = require('cors');
app.use(cors());
// morgan
const morgan = require('morgan');
app.use(morgan('common'));
// helmet
const helmet = require('helmet');
app.use(helmet());

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static('src/assets'));

const routes = require('./src/routes/index');
routes(app);

// insert data
// const housesData = require('./src/data/data');
// const Estate = require('./src/models/Estate');
const mongoose = require('mongoose');

const PORT = process.env.PORT_SERVER || 4000;
mongoose
    .connect('mongodb://127.0.0.1:27017/real_estate', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        console.log('connect successfully');
        /* ADD DATA ONE TIME */
        // Estate.insertMany(housesData);
    })
    .catch((error) => console.log(`${error} did not connect`));
