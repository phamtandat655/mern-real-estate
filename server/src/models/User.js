const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, require: true, unique: true, default: '' },
        password: { type: String, require: true, default: '' },
        name: { type: String, require: true, default: '' },
        phoneNumber: { type: String, require: true, default: '' },
        // 0 : user , 1 : admin
        role: { type: Number, require: true, default: 0 },
        refreshToken: { type: String, require: true, default: '' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('users', User);
