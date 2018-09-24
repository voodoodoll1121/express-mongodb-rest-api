//call libraries
const express = require('express');
const bodyParser = require('body-parser');

//init express app
const app = express();

//set parser content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));