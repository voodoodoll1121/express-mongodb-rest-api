const mongoose = require('mongoose');


const produkSchema = mongoose.Schema(
    {
        nama_produk: String,
        kategori: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Produk', produkSchema);