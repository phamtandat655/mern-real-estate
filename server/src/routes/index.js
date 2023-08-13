const estate = require('./estate');
const user = require('./user');

function Routes(app) {
    app.use('/user', user);
    app.use('/', estate);
}

module.exports = Routes;
