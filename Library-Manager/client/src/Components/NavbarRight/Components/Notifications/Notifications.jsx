import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Notifications.module.scss';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const cx = classNames.bind(styles);

function Notifications({ masv }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkType, setCheckType] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notifications/${masv}`);
        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [masv]);

  const handleNotificationClick = () => {
    setCheckType(checkType === 1 ? 2 : 1);
  };

  const columns = [
    { field: 'bookId', headerName: 'ID', width: 70 },
    { field: 'nameBook', headerName: 'Tên sách', width: 250 },
    { field: 'date2', headerName: 'Ngày Hết Hạn', width: 130 },
    { field: 'message', headerName: 'Thông Báo', width: 400 },
  ];

  const rows = notifications.map((item) => ({
    id: item.bookId,        // DataGrid cần trường 'id'
    bookId: item.bookId,
    nameBook: item.nameBook,
    date2: item.date2,
    message: item.message,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  if (loading) return <div className={cx('loading')}>Đang tải thông báo...</div>;
  if (error) return <div className={cx('error')}>Lỗi: {error}</div>;

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Thông báo</h2>
      <div
        onClick={handleNotificationClick}
        className={cx('notification-toggle', checkType === 2 ? 'active' : '')}
      >
        <strong>Thông báo sách quá hạn</strong>
      </div>

      {checkType === 2 && (
        <>
          {notifications.length > 0 ? (
            <Paper style={{ marginTop: '20px' }} sx={{ height: '95%', width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
              />
            </Paper>
          ) : (
            <div className={cx('no-notification')}>Không có sách quá hạn.</div>
          )}
        </>
      )}
    </div>
  );
}

export default Notifications;
