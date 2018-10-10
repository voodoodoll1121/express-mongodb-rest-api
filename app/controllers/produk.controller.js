const Produk = require('../model/produk.model');
const Kategori = require('../model/kategori.model');
//create and save produk
exports.create = (req, res) => {
    if (!req.body.nama_produk) {
        return res.status(400).send({
            message: "Nama Produk can not be empty"
        });
    }

    if (!req.body.kategori_id) {
        return res.status(400).send({
            message: "Kategori can not be empty"
        });
    }

    Kategori.findById(req.body.kategori_id)
        .then(kategori => {
            if (!kategori) {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.body.kategori_id
                });
            }
            const ProdukObject = new Produk({
                nama_produk: req.body.nama_produk,
                kategori: kategori._id
            });

            ProdukObject.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating new Produk."
                    })
                });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.body.kategori_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Kategori with id " + req.body.kategori_id
            });
        });

};

//retrieve all produk from database
exports.findAll = (req, res) => {
    Produk.find()
        .populate('kategori')
        .then(produks => {
            res.send(produks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving produks."
            })
        });
};

//retrieve produk by its id from database
exports.findOne = (req, res) => {
    Produk.findById(req.params.produkId)
        .populate('kategori')
        .then(produk => {
            if (!produk) {
                return res.status(404).send({
                    message: "Produk not found with id " + req.params.produkId
                });
            }
            res.send(produk);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Produk not found with id " + req.params.produkId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Produk with id " + req.params.produkId
            });
        });
};

//Update Produk By Id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nama_produk) {
        return res.status(400).send({
            message: "Nama Produk can not be empty"
        });
    }

    if (!req.body.kategori_id) {
        return res.status(400).send({
            message: "Kategori can not be empty"
        });
    }

    Kategori.findById(req.body.kategori_id)
        .then(kategori => {
            if (!kategori) {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.body.kategori_id
                });
            }
            // Find Produk and update it with the request body
            Produk.findByIdAndUpdate(req.params.produkId, {
                nama_produk: req.body.nama_produk,
                kategori: kategori._id
            }, { new: true })
                .then(produk => {
                    if (!produk) {
                        return res.status(404).send({
                            message: "Produk not found with id " + req.params.produkId
                        });
                    }
                    res.send(produk);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Produk not found with id " + req.params.produkId
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating produk with id " + req.params.produkId
                    });
                });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.body.kategori_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Kategori with id " + req.body.kategori_id
            });
        });


};

// Delete a produk with the specified produkId in the request
exports.delete = (req, res) => {
    Produk.findByIdAndRemove(req.params.produkId)
        .then(produk => {
            if (!produk) {
                return res.status(404).send({
                    message: "Produk not found with id " + req.params.produkId
                });
            }
            res.send({ message: "Produk deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Produk not found with id " + req.params.produkId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.produkId
            });
        });
};