import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Link, useNavigate } from 'react-router-dom';
import { requestLogin } from '../../config/Config';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [checkSaveLogin, setCheckSaveLogin] = useState(true);

    const naviagte = useNavigate();

    useEffect(() => {
        localStorage.getItem('email') && setEmail(localStorage.getItem('email'));
        localStorage.getItem('password') && setPassword(localStorage.getItem('password'));
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        try {
            const data = { email, password };
            const res = await requestLogin(data);
            toast.success(res.message);
            if (res.token) {
                naviagte('/');
            }

            if (checkSaveLogin) {
                localStorage.setItem('username', email);
                localStorage.setItem('password', password);
                return;
            } else {
                localStorage.removeItem('username', email);
                localStorage.removeItem('password', password);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('inner')}>
                <div className={cx('column-right')}>
                    <h1>Đăng Nhập</h1>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Email Của Bạn"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            value={password}
                        />
                    </div>
                    <div className={cx('remember-me')}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Nhớ tài khoản của tôi"
                            onChange={(e) => setCheckSaveLogin(e.target.checked)}
                        />
                        <Link style={{ textDecoration: 'none' }} to={'/forgot-password'}>
                            <span id={cx('forgot-password')}>Quên Mật Khẩu ?</span>
                        </Link>
                    </div>
                    <div>
                        <Button onClick={handleLogin} variant="contained" fullWidth size="large">
                            Đăng Nhập
                        </Button>
                    </div>

                    <Link to="/register">Bạn Chưa Có Tài Khoản ? </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;
