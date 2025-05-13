import { jwtDecode } from 'jwt-decode';

import cookie from 'js-cookie';

const decodeToken = () => {
    const token = cookie.get('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    }
    return null;
};

export default decodeToken;
