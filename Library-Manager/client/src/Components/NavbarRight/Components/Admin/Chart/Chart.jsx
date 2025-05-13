import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useState, useEffect } from 'react';
import { requestGetAllBookss } from '../../../../../config/Config';

// Đăng ký các component của Chart.js
Chart.register(...registerables);

const LineChart = () => {
    const [dataBrrowBooks, setDataBrrowBooks] = useState(0);
    const [dataBooks, setDataBooks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBookss();
            setDataBooks(res.sumQuantityBooks + res.sumQuantityBorrowBooks);
            setDataBrrowBooks(res.sumQuantityBorrowBooks);
        };
        fetchData();
    }, []);

    const data = {
        labels: ['January', 'February'], // Nhãn cho trục X
        datasets: [
            {
                label: 'Số Sách Người Đang Mượn', // Nhãn cho đường thứ nhất
                data: [0, dataBrrowBooks], // Dữ liệu cho đường thứ nhất
                fill: true, // Không tô màu dưới đường
                borderColor: 'rgb(75, 192, 192)', // Màu của đường thứ nhất
                tension: 0.1, // Độ cong của đường
            },
            {
                label: 'Tổng Số Sách Hiện Có', // Nhãn cho đường thứ hai
                data: [0, dataBooks], // Dữ liệu cho đường thứ hai
                fill: true,
                borderColor: 'rgb(255, 99, 132)', // Màu của đường thứ hai
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Hiển thị legend
            },
            tooltip: {
                enabled: true, // Hiển thị tooltip
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
