const Estate = require('../models/Estate');

class EstateControllers {
    showAll(req, res, next) {
        try {
            Estate.find({})
                .then((properties) => res.json(properties))
                .catch(next);
        } catch (error) {
            res.status(401).json({ error });
        }
    }
    getPropertyById(req, res, next) {
        try {
            Estate.findOne({ _id: req.params.idProperty })
                .then((property) => res.json(property))
                .catch(next);
        } catch (error) {
            res.status(401).json({ error });
        }
    }
    create(req, res, next) {
        try {
            const pathImg = req.pathImg;
            const { name, type, desc, price, country, address, bedrooms, bathrooms, surface } = req.body;
            const newProperty = {
                type,
                name,
                description: desc,
                image: pathImg,
                country,
                address,
                bedrooms,
                bathrooms,
                surface,
                price,
            };
            Estate.create(newProperty)
                .then((users) => res.redirect('back'))
                .catch(next);
        } catch (error) {
            res.status(401).json({ error });
        }
    }
    update(req, res, next) {
        try {
            let id = req.params.idProperty;
            const pathImg = req.pathImg;
            const { name, type, desc, price, country, address, bedrooms, bathrooms, surface } = req.body;
            const newProperty = {
                type,
                name,
                description: desc,
                image: pathImg,
                country,
                address,
                bedrooms,
                bathrooms,
                surface,
                price,
            };
            Estate.findByIdAndUpdate({ _id: id }, newProperty)
                .then((properties) => {
                    res.redirect('back');
                })
                .catch(next);
        } catch (error) {
            res.status(401).json({ error });
        }
    }
    delete(req, res, next) {
        try {
            let id = req.params.idProperty;
            Estate.findByIdAndDelete({ _id: id })
                .then((property) => {
                    return res.json(property);
                })
                .catch(next);
        } catch (error) {
            res.status(401).json({ error });
        }
    }
}

module.exports = new EstateControllers();
