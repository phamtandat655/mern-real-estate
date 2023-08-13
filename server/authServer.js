const express = require('express');
const app = express();
const mongoose = require('mongoose');

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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

// jwt
const jwt = require('jsonwebtoken');
const verifyToken = require('./src/middleware/auth');
const User = require('./src/models/User');

const generateTokens = (payload) => {
    const { _id, email } = payload;

    // Create JWT
    const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m',
    });

    const refreshToken = jwt.sign({ _id, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

const updateRefreshToken = async (email, refreshToken) => {
    const filter = { email: email };
    const update = { refreshToken: refreshToken };

    let doc = await User.findOneAndUpdate(filter, update);
    return doc;
};

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = User.findOne({ email: email, password: password })
        .then((user) => {
            const tokens = generateTokens(user);
            updateRefreshToken(email, tokens.refreshToken);

            res.json(tokens);
        })
        .catch((err) => res.send(err));

    if (!user) return res.sendStatus(401);
});

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = User.findOne({ email: req.body.email })
        .then((u) => {
            try {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                const tokens = generateTokens(u);
                updateRefreshToken(u.email, tokens.refreshToken);

                res.json(tokens);
            } catch (error) {
                res.sendStatus(403);
            }
        })
        .catch((err) => console.log(err));
    if (!user) return res.sendStatus(403);
});

app.delete('/logout', verifyToken, (req, res) => {
    const user = User.findOne({ _id: req.userId })
        .then((u) => updateRefreshToken(u.email, ''))
        .catch((err) => console.log(err));

    res.sendStatus(204);
});

const PORT = process.env.PORT_AUTH_SERVER || 5000;
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
