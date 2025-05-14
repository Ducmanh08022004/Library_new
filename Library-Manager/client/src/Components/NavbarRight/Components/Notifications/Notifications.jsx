import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Notifications.module.scss';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const cx = classNames.bind(styles);

function Notifications({ username }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOverdue, setShowOverdue] = useState(false);
  const [showDueSoon, setShowDueSoon] = useState(false);

  const apiBaseUrl = 'http://localhost:5000/api';

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/notifications/${username}`);
      console.log("API Response:", response);
      setNotifications(response.data.notifications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const today = new Date();

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Tháng tính từ 0
  };

  // Quá hạn
  const overdueNotifications = notifications.filter(
    (item) => parseDate(item.date2) < today
  );

  // Sắp đến hạn (chỉ lấy sách còn 1 ngày nữa là đến hạn)
  const dueSoonNotifications = notifications.filter((item) => {
    const dueDate = parseDate(item.date2);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1; // Chỉ lấy sách còn 1 ngày nữa là đến hạn
  });

  const columns = [
    { field: 'bookId', headerName: 'ID', width: 70 },
    { field: 'nameBook', headerName: 'Tên sách', width: 250 },
    { field: 'date2', headerName: 'Ngày Hết Hạn', width: 130 },
    { field: 'message', headerName: 'Thông Báo', width: 400 },
  ];

  const formatRows = (list) =>
    list.map((item) => ({
      id: item.bookId,
      bookId: item.bookId,
      nameBook: item.nameBook,
      date2: item.date2,
      message: item.message,
    }));

  if (loading) {
    return <div className={cx('loading')}>Đang tải thông báo...</div>;
  }

  if (error) {
    return <div className={cx('error')}>Lỗi: {error}</div>;
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Thông báo</h2>

      <div className={cx('buttons')}>
        <button
          onClick={() => setShowOverdue((prev) => !prev)}
          className={cx('notification-toggle', { active: showOverdue })}
        >
          📕 Thông báo sách quá hạn ({overdueNotifications.length})
        </button>

        <button
          onClick={() => setShowDueSoon((prev) => !prev)}
          className={cx('notification-toggle', { active: showDueSoon })}
        >
          📙 Sách sắp đến hạn trả ({dueSoonNotifications.length})
        </button>
      </div>

      {/* Quá hạn */}
      {showOverdue && (
        <>
          {overdueNotifications.length > 0 ? (
            <Paper style={{ marginTop: '20px' }} sx={{ height: '95%', width: '100%' }}>
              <DataGrid
                rows={formatRows(overdueNotifications)}
                columns={columns}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
              />
            </Paper>
          ) : (
            <div className={cx('no-notification')}>Không có sách quá hạn.</div>
          )}
        </>
      )}

      {/* Sắp đến hạn */}
      {showDueSoon && (
        <>
          {dueSoonNotifications.length > 0 ? (
            <Paper style={{ marginTop: '20px' }} sx={{ height: '95%', width: '100%' }}>
              <DataGrid
                rows={formatRows(dueSoonNotifications)}
                columns={columns}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
              />
            </Paper>
          ) : (
            <div className={cx('no-notification')}>Không có sách sắp đến hạn trả.</div>
          )}
        </>
      )}
    </div>
  );
}

export default Notifications;
