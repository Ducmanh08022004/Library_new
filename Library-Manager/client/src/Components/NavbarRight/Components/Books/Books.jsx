import classNames from 'classnames/bind';
import styles from './Books.module.scss';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { requestGetBorrowBooks } from '../../../../config/Config';
import ModalWatchBooks from './Modal/Modal';

const cx = classNames.bind(styles);

function Books() {
    const [dataBook, setDataBook] = useState([]);

    const [show, setShow] = useState(false);
    const [dataContentBook, setDataContentBook] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBorrowBooks();
            setDataBook(res);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'category', headerName: 'Thể Loại', width: 130 },
        { field: 'nameBook', headerName: 'Tên sách', width: 600 },
        { field: 'author', headerName: 'Tác Giả', width: 130 },
        { field: 'language', headerName: 'Ngôn Ngữ', width: 130 },
        {
            field: 'action',
            headerName: 'Hành Động',
            width: 130,
            renderCell: (params) => (
                <Button variant="contained" color="primary" size="small" onClick={() => handleAction(params.row)}>
                    Đọc Sách
                </Button>
            ),
        },
    ];

    const rows = dataBook
        .filter((item) => item.status === '1')
        .map((item) => {
            return {
                id: item.id,
                category: item.category,
                nameBook: item.nameBook,
                author: item.author,
                language: item.language,
                content: item.content,
                img: item.images,
            };
        });

    const paginationModel = { page: 0, pageSize: 5 };

    const handleAction = (row) => {
        setShow(true);
        setDataContentBook(row);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Đọc Sách</h2>
            <Paper style={{ marginTop: '40px' }} sx={{ height: '95%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            <ModalWatchBooks show={show} setShow={setShow} dataContentBook={dataContentBook} />
        </div>
    );
}

export default Books;
