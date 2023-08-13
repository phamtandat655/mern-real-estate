const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Estate = new Schema(
    {
        type: { type: String, require: true },
        name: { type: String, require: true },
        description: { type: String, require: true },
        image: { type: String, require: true },
        country: { type: String, require: true },
        address: { type: String, require: true },
        bedrooms: { type: String, require: true },
        bathrooms: { type: String, require: true },
        surface: { type: String, require: true },
        price: { type: String, require: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('estates', Estate);
