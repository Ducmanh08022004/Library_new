import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; // Import dayjs để xử lý ngày
import { requestBrowBooks } from '../../../../../config/Config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

function ModalActionBook({ show, setShow, dataBook }) {
    const handleClose = () => setShow(false);

    const [masv, setMasv] = useState('');
    const [username, setUsername] = useState('');
    const [khoa, setKhoa] = useState('');
    const [quantity, setQuantity] = useState(Number);
    const [type, setType] = useState('');
    const [date1, setDate1] = useState(dayjs()); // Giá trị mặc định là Dayjs object
    const [date2, setDate2] = useState(dayjs());

    const handleBorrowBook = async () => {
        // Kiểm tra xem ngày trả có lớn hơn ngày mượn không
        if (!date2.isAfter(date1)) {
            toast.error('Ngày trả phải lớn hơn ngày mượn!');
            return; // Dừng lại nếu điều kiện không được thoả mãn
        }
        if (quantity < 1) {
            toast.error('Vui lòng nhập số lượng mượn sách !');
            return;
        }

        const data = {
            masv,
            username,
            khoa,
            quantity,
            type,
            date1: date1.toISOString(), // Chuyển đổi sang chuỗi ISO trước khi gửi lên server
            date2: date2.toISOString(),
            idBook: dataBook.id,
        };

        try {
            const res = await requestBrowBooks(data);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error borrowing book:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Lập Phiếu Mượn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {dataBook?.nameBook || 'Chưa có thông tin sách'}
                            </span>
                        </div>
                        <TextField
                            id="outlined-required"
                            label="Mã Sinh Viên"
                            fullWidth
                            value={masv}
                            onChange={(e) => setMasv(e.target.value)}
                        />

                        <TextField
                            id="outlined-required"
                            label="Họ Và Tên"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            id="outlined-required"
                            label="Khoa"
                            fullWidth
                            value={khoa}
                            onChange={(e) => setKhoa(e.target.value)}
                        />

                        <TextField
                            id="outlined-required"
                            label="Số Lượng"
                            fullWidth
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Hình Thức Mượn</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Hình Thức Mượn"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="Mượn Online">Mượn Online</MenuItem>
                            </Select>
                        </FormControl>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Ngày Mượn"
                                        value={date1}
                                        onChange={(newValue) => setDate1(newValue)} // Đảm bảo newValue là Dayjs object
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Ngày Trả"
                                        value={date2}
                                        onChange={(newValue) => setDate2(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleBorrowBook}>
                        Mượn Sách
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalActionBook;
