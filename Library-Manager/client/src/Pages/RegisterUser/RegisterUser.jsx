import classNames from 'classnames/bind';
import styles from './RegisterUser.module.scss';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestRegister } from '../../config/Config';

const cx = classNames.bind(styles);

function RegisterUser() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            return toast.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        try {
            const data = { username, password, email };
            const res = await requestRegister(data);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('inner')}>
                <div className={cx('column-right')}>
                    <h1>Đăng Ký</h1>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Họ và tên"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Email "
                            variant="outlined"
                            size="medium"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Mật Khẩu"
                            variant="outlined"
                            type="password"
                            size="medium"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('remember-me')}>
                        <Link style={{ textDecoration: 'none' }} to={'/forgot-password'}>
                            <span id={cx('forgot-password')}>Quên Mật Khẩu ?</span>
                        </Link>
                    </div>
                    <div>
                        <Button onClick={handleRegister} variant="contained" fullWidth size="large">
                            Đăng Ký
                        </Button>
                    </div>

                    <Link to="/login">Bạn Đã Có Tài Khoản ? </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;
