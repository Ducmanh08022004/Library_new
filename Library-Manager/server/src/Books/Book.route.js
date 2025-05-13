const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controllerBook = require('./Book.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

router.get('/api/books', controllerBook.getAllBooks);
router.post('/api/createbook', upload.single('img'), controllerBook.createBook);
router.get('/api/search', controllerBook.searchBooks);
router.post('/api/delete', controllerBook.deleteBook);

module.exports = router;
