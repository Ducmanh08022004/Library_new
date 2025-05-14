import './App.css';

import classNames from 'classnames/bind';
import styles from './App.module.scss';
import NavbarLeft from './Components/NavbarLeft/NavbarLeft';
import NavbarRight from './Components/NavbarRight/NavbarRight';
import decodeToken from './utils/DecodeJWT';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function App() {
    const [checkType, setCheckType] = useState(0);

    const [dataUser, setDataUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const token = decodeToken();
        if (token === null) {
            navigate('/login');
        }
        setDataUser(token);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('column-left')}>
                <NavbarLeft setCheckType={setCheckType} checkType={checkType} dataUser={dataUser} />
            </div>

            <div className={cx('column-right')}>
                <NavbarRight checkType={checkType} username={dataUser.username}/>
            </div>
        </div>
    );
}

export default App;
