const express = require('express');
const router = express.Router();
const NotificationsController = require('./Notifications.controller');

// Lấy danh sách thông báo quá hạn  cho sinh viên
router.get('/:masv', NotificationsController.getOverdueBooks);

module.exports = router;
