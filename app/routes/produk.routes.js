module.exports = (app) => {
    const produks = require('../controllers/produk.controller.js');

    // Create a new Produk
    app.post('/produks', produks.create);

    // Retrieve all Produk
    app.get('/produks', produks.findAll);

    // Retrieve a single Produk with produkId
    app.get('/produks/:produkId', produks.findOne);

    // Update a Produk with produkId
    app.put('/produks/:produkId', produks.update);

    // Delete a Produk with produkId
    app.delete('/produks/:produkId', produks.delete);
}