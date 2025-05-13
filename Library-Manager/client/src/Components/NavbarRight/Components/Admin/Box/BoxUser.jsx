import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { requestGetAllUser } from '../../../../../config/Config';

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
    const [lengthUser, setLengthUser] = useState(0);

    const [data, setData] = useState();

    const totalParticipants = lengthUser;
    const percentage = data;

    const sumUser = 100;

    useEffect(() => {}, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllUser();
            setLengthUser(res.length);
            const total = (res.length / sumUser) * 100;
            setData(total);
        };
        fetchData();
    }, []);

    return (
        <div style={{ width: '250px' }}>
            <CardContainer>
                <Typography variant="h4">{totalParticipants?.toLocaleString()}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Số người tham thư viện
                </Typography>
                <ProgressContainer>
                    <LinearProgress variant="determinate" value={percentage} />
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right' }}>
                        {percentage}%
                    </Typography>
                </ProgressContainer>
            </CardContainer>
        </div>
    );
}

export default BoxUser;
