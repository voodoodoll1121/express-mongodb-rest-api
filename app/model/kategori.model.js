const mongoose = require('mongoose');


const kategoriSchema = mongoose.Schema(
    {
        nama_kategori: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Kategori', kategoriSchema);