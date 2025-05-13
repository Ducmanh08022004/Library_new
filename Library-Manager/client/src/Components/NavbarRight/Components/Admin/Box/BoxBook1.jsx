import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

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

const totalParticipants = 100;
const percentage = 70; // Phần trăm tham gia

function BoxBook1() {
    return (
        <div style={{ width: '250px' }}>
            <CardContainer>
                <Typography variant="h4">{totalParticipants?.toLocaleString()}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Số sách quá hạn
                </Typography>
                <ProgressContainer>
                    <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                            backgroundColor: '#e0e0e0', // Màu nền của thanh tiến trình
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#f44336', // Màu của thanh tiến trình
                            },
                        }}
                    />
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'right' }}>
                        {percentage}%
                    </Typography>
                </ProgressContainer>
            </CardContainer>
        </div>
    );
}

export default BoxBook1;
