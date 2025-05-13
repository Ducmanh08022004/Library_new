import classNames from 'classnames/bind';
import styles from './NavbarRight.module.scss';
import ListBook from './Components/ListBook/ListBook';
import SearchBook from './Components/SearchBook/SearchBook';
// import Books from './Components/Books/Books';
import Admin from './Components/Admin/Admin';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Notifications from './Components/Notifications/Notifications';

const cx = classNames.bind(styles);

function NavbarRight({ checkType }) {
    return (
        <div className={cx('wrapper')}>
            {checkType === 0 ? <ListBook /> : <></>}
            {checkType === 1 ? <SearchBook /> : <></>}
            {checkType === 2 ? <Notifications /> : <></>}
            {checkType === 3 ? <Admin /> : <></>}
        </div>
    );
}

export default NavbarRight;
