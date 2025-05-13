import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestChangePassword, requestForgetPassword } from '../../config/Config';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const [checkStatus, setCheckStatus] = useState(false);
    const [token, setToken] = useState('');
    const [otp, setOtp] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await requestForgetPassword({ email: email });
        if (res.status === 200) {
            setCheckStatus(true);
            setEmail('');
        } else {
            setCheckStatus(false);
        }
    };

    const handleChangePass = async () => {
        const res = await requestChangePassword({ newPassword: newPassword, token: token, otp: otp });
        if (res.status === 200) {
            navigate('/login');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {!checkStatus ? (
                    <>
                        <h2>Quên mật khẩu?</h2>
                        <div className={cx('input-group')}>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            className={cx('submit-button')}
                        >
                            Gửi yêu cầu khôi phục
                        </Button>
                        <div style={{ paddingTop: '20px' }}>
                            <Link to="/login">Đăng Nhập</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Mật Khẩu Mới</h2>
                        <div className={cx('input-group')}>
                            <TextField
                                id="outlined-basic"
                                label="Nhập Mật Khẩu Mới"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="OTP Của Bạn"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={otp}
                                className="mt-3"
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Token Của Bạn"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                value={token}
                                className="mt-3"
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={handleChangePass}
                            className={cx('submit-button')}
                        >
                            Thay Đổi Mật Khẩu
                        </Button>
                        <div style={{ paddingTop: '20px' }}>
                            <Link to="/login">Đăng Nhập</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
