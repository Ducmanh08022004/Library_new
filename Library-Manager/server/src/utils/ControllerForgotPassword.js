const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const ForgotPassword = async (email, token, otp) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.USER_GOOGLE,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const info = await transport.sendMail({
            from: `Thư Viện Lương Đỉnh Của" <${process.env.USER_GOOGLE}`, // sender address
            to: email, // list of receivers
            subject: 'Forgot Password', // Subject line
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">Xin chào ${email},</h2>
                <p style="font-size: 16px; line-height: 1.5; color: #333;">Mã Token thiết lập lại mật khẩu của bạn là:</p>
                <p style="font-size: 24px; font-weight: bold; color: #d9534f; background-color: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center;">${token}</p>
                <p style="font-size: 16px; line-height: 1.5; color: #333;">Mã OTP thiết lập lại mật khẩu của bạn là:</p>
                <p style="font-size: 24px; font-weight: bold; color: #d9534f; background-color: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center;">${otp}</p>
                <p style="font-size: 16px; line-height: 1.5;">Vui lòng sử dụng mã này để hoàn tất việc thiết lập lại mật khẩu.</p>
                <br>
                <p style="font-size: 14px; color: #555;">Trân trọng,</p>
                <p style="font-size: 14px; font-weight: bold;">Thư Viện Lương Đỉnh Của Team</p>
                <p style="font-size: 12px; color: #888;">Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.</p>
            </div>
            `,
        });
    } catch (error) {
        console.log('Error sending email:', error);
    }
};
module.exports = ForgotPassword;
