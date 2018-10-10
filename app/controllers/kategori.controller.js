const Kategori = require('../model/kategori.model');

//create and save kategori
exports.create = (req, res) => {
    if (!req.body.nama_kategori) {
        return res.status(400).send({
            message: "Nama Kategori can not be empty"
        });
    }

    const KategoriObject = new Kategori({
        nama_kategori: req.body.nama_kategori
    });

    KategoriObject.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating new Kategori."
            })
        });
};

//retrieve all kategori from database
exports.findAll = (req, res) => {
    Kategori.find()
        .then(kategoris => {
            res.send(kategoris);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving kategoris."
            })
        });
};

//retrieve kategori by its id from database
exports.findOne = (req, res) => {
    Kategori.findById(req.params.kategoriId)
        .then(kategori => {
            if (!kategori) {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            res.send(kategori);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Kategori with id " + req.params.kategoriId
            });
        });
};

//Update Kategori By Id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.nama_kategori) {
        return res.status(400).send({
            message: "Nama Kategori can not be empty"
        });
    }

    // Find Kategori and update it with the request body
    Kategori.findByIdAndUpdate(req.params.kategoriId, {
        nama_kategori: req.body.nama_kategori
    }, { new: true })
        .then(kategori => {
            if (!kategori) {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            res.send(kategori);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            return res.status(500).send({
                message: "Error updating kategori with id " + req.params.kategoriId
            });
        });
};

// Delete a kategori with the specified kategoriId in the request
exports.delete = (req, res) => {
    Kategori.findByIdAndRemove(req.params.kategoriId)
        .then(kategori => {
            if (!kategori) {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            res.send({ message: "Kategori deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Kategori not found with id " + req.params.kategoriId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.kategoriId
            });
        });
};