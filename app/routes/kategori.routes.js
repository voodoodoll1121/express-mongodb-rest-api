module.exports = (app) => {
    const kategoris = require('../controllers/kategori.controller.js');

    // Create a new Kategori
    app.post('/kategoris', kategoris.create);

    // Retrieve all Kategori
    app.get('/kategoris', kategoris.findAll);

    // Retrieve a single Kategori with kategoriId
    app.get('/kategoris/:kategoriId', kategoris.findOne);

    // Update a Kategori with kategoriId
    app.put('/kategoris/:kategoriId', kategoris.update);

    // Delete a Kategori with kategoriId
    app.delete('/kategoris/:kategoriId', kategoris.delete);
}