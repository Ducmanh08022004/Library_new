import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export const requestRegister = async (data) => {
    const res = await request.post('/register', data);
    return res.data;
};

export const requestLogin = async (data) => {
    const res = await request.post('/login', data);
    return res.data;
};

export const requestGetAllBooks = async () => {
    const res = await request.get('/books');
    return res.data;
};
export const requestSearchBook = async (valueSeach) => {
    const res = await request.get('/search', { params: { nameBook: valueSeach } });
    return res.data;
};
export const requestBrowBooks = async (data) => {
    const res = await request.post('/borrowbooks', data);
    return res.data;
};
export const requestGetBorrowBooks = async () => {
    const token = document.cookie.split('=')[1];
    if (!token) return;
    const res = await request.get('/getborrowbooks');
    return res.data;
};

export const requestCreateBook = async (data) => {
    const res = await request.post('/createbook', data);
    return res.data;
};

export const requestDeleteBook = async (data) => {
    const res = await request.post('/delete', data);
    return res.data;
};

export const requestGetAllUser = async () => {
    const res = await request.get('/users');
    return res.data;
};

export const requestGetAllBookss = async () => {
    const res = await request.get('/bookss');
    return res.data;
};

export const requestGetTopBooks = async () => {
    const res = await request.get('/topbooks');
    return res.data;
};

export const requestGetTopAuthor = async () => {
    const res = await request.get('/topauthor');
    return res.data;
};

export const requestForgetPassword = async (email) => {
    const res = await request.post('/forgotpassword', email);
    return res;
};

export const requestChangePassword = async (newPassword, token, otp) => {
    const res = await request.post('/resetpassword', newPassword, token, otp);
    return res;
};
