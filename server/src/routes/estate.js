const EstateControllers = require('../controllers/EstateControllers');
const express = require('express');
const router = express.Router();

const verify = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/create', upload.single('image'), EstateControllers.create);
router.post('/update/:idProperty', upload.single('image'), EstateControllers.update);
router.delete('/:idProperty', EstateControllers.delete);
router.get('/property/:idProperty', EstateControllers.getPropertyById);
router.get('/', verify, EstateControllers.showAll);

module.exports = router;
