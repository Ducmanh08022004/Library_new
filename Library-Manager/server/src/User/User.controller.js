const bcrypt = require('bcrypt');

const modelUser = require('./User.model');

const jwt = require('jsonwebtoken');

const ForgotPassword1 = require('../utils/ControllerForgotPassword');

require('dotenv').config();

class ControllerUser {
    async registerUser(req, res) {
        const { username, password, email } = req.body;

        const dataUser = await modelUser.findOne({ where: { username } });
        if (dataUser) {
            return res.status(403).json({ message: 'Tài Khoản Đã Tồn Tại !!!' });
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const user = await modelUser.create({
                username,
                email,
                password: hash,
                isAdmin: '0',
            });
            user.save();

            res.status(201).json({ message: 'Đăng Ký Thành Công !!!' });
        }
    }
    async LoginUser(req, res) {
        const { email, password } = req.body;
        const dataUser = await modelUser.findOne({ where: { email } });
        if (dataUser) {
            const checkPassword = bcrypt.compareSync(password, dataUser.password);
            if (checkPassword) {
                const token = jwt.sign(
                    { username: dataUser.username, isAdmin: dataUser.isAdmin, email: dataUser.email },
                    process.env.SECRETKEY_JWT,
                    {
                        expiresIn: process.env.EXPIRESIN_JWT,
                    },
                );
                res.setHeader('Set-Cookie', [`token=${token}; Max-Age=1800; Path=/;`])
                    .status(200)
                    .json({ message: 'Đăng nhập thành công !!!', token });
            } else {
                return res.status(403).json({ message: 'Tài khoản hoặc mật khẩu không chính xác !!!' });
            }
        } else {
            return res.status(403).json({ message: 'Tài khoản hoặc mật khẩu không chính xác !!!' });
        }
    }

    async ResetPassword(req, res) {
        const SECRET_KEY = process.env.SECRETKEY_JWT;
        const { token, newPassword, otp } = req.body;

        const hashPassword = await bcrypt.hash(newPassword, 10);

        const decoded = jwt.verify(token, SECRET_KEY);

        if (decoded.otp === otp) {
            await modelUser.update({ password: hashPassword }, { where: { email: decoded.email } });
            return res.status(200).json({ message: 'Thay đổi mật khẩu thành công !!!' });
        } else {
            return res.status(401).json({ message: 'Bạn Cần Xem Lại Thông Tin ' });
        }
    }

    async ForgotPassword(req, res) {
        const dataUser = await modelUser.findOne({ where: { email: req.body.email } });
        if (!dataUser) {
            return res.status(401).json({ message: 'Không Tìm Thấy Người Dùng !!!' });
        }
        const SECRET_KEY = process.env.SECRETKEY_JWT;
        const OTP_EXPRIRY = '15m';
        const email = req.body.email;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const token = jwt.sign({ email, otp }, SECRET_KEY, { expiresIn: OTP_EXPRIRY });
        ForgotPassword1(email, token, otp);
        return res.status(200).json({ message: 'Thành Công !!!' });
    }
}

module.exports = new ControllerUser();
