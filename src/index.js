const express = require('express');
require('dotenv').config({path: '../.env'});
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true}));

module.exports = app;