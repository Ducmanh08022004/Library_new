import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import BoxUser from './Box/BoxUser';
import BoxBook from './Box/BoxBook';
import BoxBook1 from './Box/BoxBook1';
import LineChart from './Chart/Chart';

import { useEffect, useState } from 'react';
import ManagerBooks from './Components/ManagerBooks';
import { requestGetTopAuthor, requestGetTopBooks } from '../../../../config/Config';

const cx = classNames.bind(styles);

function Admin() {
    const [checkPages, setCheckPages] = useState(false);

    const [topBooks, setTopBooks] = useState([]);
    const [topAuthor, setTopAuthor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetTopBooks();
            const res1 = await requestGetTopAuthor();

            setTopBooks(res);
            setTopAuthor(res1);
        };

        fetchData();
    }, []);

    console.log(topBooks);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>{!checkPages ? 'BẢNG THỐNG KÊ NHANH' : 'QUẢN LÝ SÁCH'}</h2>
                <div className={cx('button')}>
                    <button onClick={() => setCheckPages(!checkPages)}>
                        {!checkPages ? 'QUẢN LÝ SÁCH' : 'BẢNG THỐNG KÊ NHANH'}
                    </button>
                </div>
            </div>
            {!checkPages ? (
                <>
                    <div className={cx('inner')}>
                        <div className={cx('column-left')}>
                            <BoxUser />
                            <BoxBook />
                        </div>

                        <div className={cx('column-right')}>
                            <LineChart />
                        </div>
                    </div>

                    <div className={cx('inner-2')}>
                        <div className={cx('column-left-2')}>
                            <h2>Top Độc Giả</h2>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Tên Người Dùng</th>
                                            <th scope="col">Số Lần Mượn Sách</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topAuthor.map((item, index) => (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.author}</td>
                                                <td>{item.sumQuantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={cx('column-right-2')}>
                            <h2>Top Sách Yêu Thích</h2>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">Tên Sách</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topBooks.map((item, index) => (
                                            <tr>
                                                <td>
                                                    <img
                                                        style={{ width: '80px', height: '80px' }}
                                                        src={`http://localhost:5000/uploads/${item.images}`}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>{item.nameBook}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <ManagerBooks />
                </div>
            )}
        </div>
    );
}

export default Admin;
