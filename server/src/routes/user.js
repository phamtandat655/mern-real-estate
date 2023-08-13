const UserControllers = require('../controllers/UserControllers');
const express = require('express');
const router = express.Router();

router.post('/create', UserControllers.createUser);
router.get('/:email', UserControllers.getUserByEmail);
router.get('/', UserControllers.getAllUser);

module.exports = router;
