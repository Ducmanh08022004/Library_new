import classNames from 'classnames/bind';
import styles from './SearchBook.module.scss';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { requestGetAllBooks, requestSearchBook } from '../../../../config/Config';
import ModalActionBook from './Modal/Modal';

const cx = classNames.bind(styles);

function SearchBook() {
    const [dataBooks, setDataBooks] = useState([]);
    const [valueSearch, setValueSearch] = useState('');

    const [show, setShow] = useState(false);
    const [dataBook, setDataBook] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBooks();
            setDataBooks(res);
        };
        fetchData();
    }, [show]);

    useEffect(() => {
        if (!valueSearch) return;
        const fetchData = async () => {
            const res = await requestSearchBook(valueSearch);
            setDataBooks(res);
        };
        fetchData();
    }, [valueSearch]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'img',
            headerName: 'Ảnh Sách',
            width: 200,
            renderCell: (params) => <img src={params.value} alt="Book" className={cx('book-img')} />,
        },
        { field: 'category', headerName: 'Thể Loại', width: 130 },
        { field: 'nameBook', headerName: 'Tên sách', width: 470 },
        { field: 'author', headerName: 'Tác Giả', width: 130 },
        // { field: 'language', headerName: 'Ngôn Ngữ', width: 130 },
        {
            field: 'quantity',
            headerName: 'Số Lượng Sách',
            width: 130,
            renderCell: (params) => <span style={{ color: params.value >= 1 ? 'green' : 'red' }}>{params.value}</span>,
        },
        {
            field: 'action',
            headerName: 'Thao tac',
            width: 130,
            renderCell: (params) => (
                <Button variant="contained" color="primary" size="small" onClick={() => handleAction(params.row)}>
                    Mượn Sách
                </Button>
            ),
        },
    ];

    const rows = dataBooks
        .filter((item) => item.quantity > 0)
        .map((item) => ({
            id: item.id,
            img: `http://localhost:5000/uploads/${item.images}`,
            category: item.category,
            nameBook: item.nameBook,
            author: item.author,
            language: item.language,
            quantity: item.quantity,
        }));

    const paginationModel = { page: 0, pageSize: 10 };

    const handleAction = (row) => {
        setShow(true);
        setDataBook(row);
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2>Tìm Kiếm Sách</h2>
                <TextField
                    id="outlined-required"
                    label="Search"
                    fullWidth
                    onChange={(e) => setValueSearch(e.target.value)}
                />
            </div>
            <Paper style={{ marginTop: '40px' }} sx={{ height: '95%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 20]}
                    rowHeight={150}
                    sx={{ border: 0 }}
                />
            </Paper>
            <ModalActionBook show={show} setShow={setShow} dataBook={dataBook} />
        </div>
    );
}

export default SearchBook;
