import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

import { useState, useEffect } from 'react';
import { requestGetAllBookss } from '../../../../../config/Config';

const CardContainer = styled(Box)({
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const ProgressContainer = styled(Box)({
    width: '100%',
    marginTop: '8px',
});

function BoxUser() {
    const [dataBrrowBooks, setDataBrrowBooks] = useState(0);
    const [dataBooks, setDataBooks] = useState(0);

    const totalParticipants = dataBrrowBooks;
    const percentage = (dataBrrowBooks / dataBooks) * 100;

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllBookss();
            setDataBooks(res.sumQuantityBooks + res.sumQuantityBorrowBooks);
            setDataBrrowBooks(res.sumQuantityBorrowBooks);
        };
        fetchData();
    }, []);

    return (
        <div style={{ width: '250px' }}>
            <CardContainer>
                <Typography variant="h4">{totalParticipants?.toLocaleString()}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Số sách đang mượn / {dataBooks} Tổng Số Sách
                </Typography>
                <ProgressContainer>
                    <LinearProgress variant="determinate" value={percentage} />
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right' }}>
                        {percentage.toFixed(2)}%
                    </Typography>
                </ProgressContainer>
            </CardContainer>
        </div>
    );
}

export default BoxUser;
