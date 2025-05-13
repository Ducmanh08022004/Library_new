import App from '../App';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import LoginUser from '../Pages/LoginUser/LoginUser';
import RegisterUser from '../Pages/RegisterUser/RegisterUser';

export const publicRoutes = [
    { path: '/login', component: <LoginUser /> },
    { path: '/register', component: <RegisterUser /> },
    { path: '/forgot-password', component: <ForgotPassword /> },
    { path: '/', component: <App /> },
];
