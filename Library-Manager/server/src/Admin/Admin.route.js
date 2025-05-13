const express = require('express');
const router = express.Router();

const controllerAdmin = require('./Admin.controller');

router.get('/api/users', controllerAdmin.getAllUsers);
router.get('/api/bookss', controllerAdmin.getAllBooks);

router.get('/api/topauthor', controllerAdmin.topAuthor);
router.get('/api/topbooks', controllerAdmin.topBooks);

module.exports = router;
