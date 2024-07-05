// LoadingIndicator.jsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

const LoadingIndicator = ({ open }) => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={open}
        >
        <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingIndicator;
