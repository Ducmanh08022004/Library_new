const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const { connectDB } = require('./config/configDB');
const route = require('./Routes/index');
const controllerCheckBook = require('./utils/ControllerCheckBook');

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../src')));
app.use((req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1];
        if (token) {
            return next();
        }
    } catch (error) {
        next(0);
    }
});

controllerCheckBook();

connectDB();
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
