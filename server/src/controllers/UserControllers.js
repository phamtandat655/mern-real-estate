const User = require('../models/User');

class UserControllers {
    getAllUser(req, res, next) {
        try {
            User.find({})
                .then((users) => res.json(users))
                .catch(next);
        } catch (error) {
            res.status(401).json(error);
        }
    }
    getUserByEmail(req, res, next) {
        try {
            User.findOne({ email: req.params.email })
                .then((user) => res.json(user))
                .catch(next);
        } catch (error) {
            res.status(401).json(error);
        }
    }
    createUser(req, res, next) {
        try {
            User.create(req.body)
                .then((users) => res.json(users))
                .catch(next);
        } catch (error) {
            res.status(401).json(error);
        }
    }
}

module.exports = new UserControllers();
