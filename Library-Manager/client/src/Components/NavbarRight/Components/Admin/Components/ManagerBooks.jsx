import classNames from 'classnames/bind';
import styles from './ManagerBooks.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { requestCreateBook, requestDeleteBook, requestGetAllBooks } from '../../../../../config/Config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const paginationModel = { page: 0, pageSize: 5 };

const cx = classNames.bind(styles);

function ManagerBooks() {
    const [imgPreview, setImgPreview] = useState('');

    const [nameBook, setNameBook] = useState('');

    const [category, setCategory] = useState('');

    const [author, setAuthor] = useState('');

    const [language, setLanguage] = useState('');

    const [quantity, setQuantity] = useState('');

    const [images, setImages] = useState('');

    const [content, setContent] = useState('');

    const [dataBook, setDataBook] = useState([]);

    const handleCreateBook = async () => {
        try {
            const formData = new FormData();
            formData.append('nameBook', nameBook);
            formData.append('category', category);
            formData.append('author', author);
            formData.append('language', language);
            formData.append('quantity', quantity);
            formData.append('img', images);
            formData.append('content', content);

            const res = await requestCreateBook(formData);
            const res1 = await requestGetAllBooks();
            setDataBook(res1);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBooks();
            setDataBook(res);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'img',
            headerName: 'Ảnh Sách',
            width: 200,
            renderCell: (params) => <img src={params.value} alt="Book" className={cx('book-img')} />,
        },
        { field: 'category', headerName: 'Thể Loại', width: 130 },
        { field: 'nameBook', headerName: 'Tên sách', width: 290 },
        { field: 'author', headerName: 'Tác Giả', width: 130 },
        { field: 'language', headerName: 'Ngôn Ngữ', width: 130 },
        { field: 'quantity', headerName: 'Số Lượng', width: 130 },
        {
            field: 'actions',
            headerName: 'Hành Động',
            width: 130,
            renderCell: (params) => (
                <Button variant="contained" color="primary" size="small" onClick={() => handleAction(params.row)}>
                    Xóa Sách
                </Button>
            ),
        },
    ];

    const handleAction = async (row) => {
        const { id, nameBook } = row;
        const data = { id, nameBook };
        try {
            const res = await requestDeleteBook(data);
            const res1 = await requestGetAllBooks();
            setDataBook(res1);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const rows = dataBook.map((item) => ({
        id: item.id,
        img: `http://localhost:5000/uploads/${item.images}`,
        category: item.category,
        nameBook: item.nameBook,
        author: item.author,
        language: item.language,
        quantity: item.quantity,
    }));

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('form-add-book')}>
                <div className={cx('img')}>
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setImgPreview(URL.createObjectURL(file));
                            setImages(file);
                        }}
                    />
                    {imgPreview && (
                        <img
                            style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }}
                            src={imgPreview}
                            alt="preview"
                        />
                    )}
                </div>

                <div className={cx('form-info')}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Tên Sách"
                            variant="outlined"
                            onChange={(e) => setNameBook(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Thể Loại"
                            variant="outlined"
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Tác Giả"
                            variant="outlined"
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Ngôn Ngữ"
                            variant="outlined"
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                    <TextField
                        id="outlined-basic"
                        label="Số Lượng"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <Editor
                        apiKey="n4hxnmi16uwk9dmdgfx6nscsf8oc30528dlcub1mzsk8deqy"
                        onEditorChange={(newContent) => setContent(newContent)} // Sử dụng onEditorChange để cập nhật nội dung
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table code help wordcount',
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />

                    <Button onClick={handleCreateBook} variant="contained">
                        Thêm Sách
                    </Button>
                </div>
            </div>

            <div className={cx('manager-books')}>
                <h2>Quản Lý Sách Hiện Có</h2>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        rowHeight={150}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default ManagerBooks;
