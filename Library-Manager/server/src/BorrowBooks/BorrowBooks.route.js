const express = require('express');
const router = express.Router();

const borrowBooksController = require('./BorrowBooks.controller');  // Thêm dòng này

// Route cho API mượn sách
router.post('/api/borrowbooks', borrowBooksController.BorrowBooksUser);
router.get('/api/getborrowbooks', borrowBooksController.getAllBorrowBooks);
router.post('/api/return', borrowBooksController.returnBook);  


router.post('/borrow', (req, res) => borrowBooksController.BorrowBooksUser(req, res));
router.get('/get', (req, res) => borrowBooksController.getAllBorrowBooks(req, res));
router.post('/return', (req, res) => borrowBooksController.returnBook(req, res));
router.post('/return', borrowBooksController.returnBook);
router.post('/return', (req, res) => {
  res.json({ message: 'Book returned successfully' });
});
module.exports = router;
