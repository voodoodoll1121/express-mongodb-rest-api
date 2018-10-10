//call libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//config database
const dbConfig = require('./config/database.config');

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected To Database');
}).catch(err => {
    console.log('Connection Fail. Exiting now...', err);
    process.exit();
});

//init express app
const app = express();

//set parser content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//set parser content-type : application/json
app.use(bodyParser.json());

//set route kategori
require('./app/routes/kategori.routes')(app);
//set route produk
require('./app/routes/produk.routes')(app);

//route index
app.get('/', (req, res) => {
    res.json({ "message": "Index Page" });
});

//listening request
app.listen(3000, () => {
    console.log('Server Listening Port 3000');
}); 