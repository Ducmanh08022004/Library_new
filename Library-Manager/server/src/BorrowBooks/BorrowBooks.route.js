const express = require('express');
const router = express.Router();

const borrowBooksController = require('./BorrowBooks.controller');

// Routes for API
router.post('/api/borrowbooks', borrowBooksController.BorrowBooksUser);
router.get('/api/getborrowbooks', borrowBooksController.getAllBorrowBooks);
router.post('/api/return', borrowBooksController.returnBook);

// Routes for traditional paths (if needed)
router.post('/borrow', (req, res) => borrowBooksController.BorrowBooksUser(req, res));
router.get('/get', (req, res) => borrowBooksController.getAllBorrowBooks(req, res));
router.post('/return',(req, res) => borrowBooksController.returnBook(req, res));

module.exports = router;
