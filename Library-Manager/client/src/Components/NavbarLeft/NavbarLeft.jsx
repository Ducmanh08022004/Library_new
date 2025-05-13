import classNames from 'classnames/bind';
import styles from './NavbarLeft.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faSearch, faSignOut, faUserTie, faBell } from '@fortawesome/free-solid-svg-icons';

import cookies from 'js-cookie';

import decoded from '../../utils/DecodeJWT';

const cx = classNames.bind(styles);

function NavbarLeft({ setCheckType, checkType, dataUser }) {
    const handleLogout = () => {
        cookies.remove('token');
        window.location.reload();
    };

    const dataToken = decoded();

    return (
        <div className={cx('wrapper')}>
            <h1>LOGO</h1>

            <div className={cx('form-wrapper')}>
                <ul>
                    <li onClick={() => setCheckType(0)} id={cx(checkType === 0 ? 'active' : '')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHome} /> History
                    </li>

                    <li onClick={() => setCheckType(1)} id={cx(checkType === 1 ? 'active' : '')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faSearch} /> Search
                    </li>

                    {/* <li onClick={() => setCheckType(2)} id={cx(checkType === 2 ? 'active' : '')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faBook} /> Books
                    </li> */}
                    <li onClick={() => setCheckType(2)} id={cx(checkType === 2 ? 'active' : '')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faBell} /> Notifications
                    </li>

                    {dataToken?.isAdmin === '1' ? (
                        <li onClick={() => setCheckType(3)} id={cx(checkType === 3 ? 'active' : '')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faUserTie} /> Admin
                        </li>
                    ) : (
                        <></>
                    )}

                    <li onClick={handleLogout}>
                        <FontAwesomeIcon id={cx('icon')} icon={faSignOut} /> Sign Out
                    </li>
                </ul>
            </div>

            <div className={cx('user')}>
                <img src="https://www.remik.com/wp-content/uploads/2024/07/Max-R_Headshot.jpg" alt="123" />
                <div className={cx('user-info')}>
                    <h4>{dataUser?.username}</h4>
                    <span>{dataUser?.isAdmin === '1' ? 'Admin' : 'User'}</span>
                </div>
            </div>
        </div>
    );
}

export default NavbarLeft;
