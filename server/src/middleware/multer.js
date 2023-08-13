// multer
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/img');
    },
    filename: function (req, file, cb) {
        req.pathImg = '/img/' + Date.now() + path.extname(file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

module.exports = upload;
