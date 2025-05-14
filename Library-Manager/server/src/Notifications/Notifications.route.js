const express = require('express');
const router = express.Router();
const NotificationsController = require('./Notifications.controller');

// Route GET: Lấy danh sách sách quá hạn theo mã sinh viên
router.get('/:masv', NotificationsController.getOverdueBooks);

module.exports = router;
