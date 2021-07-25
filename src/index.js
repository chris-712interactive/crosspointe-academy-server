const express = require('express');
require('dotenv').config({path: '../.env'});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;