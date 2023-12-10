import React from 'react';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import './Toast.css';

const Toast = ({ successMessage, errorMessage }) => {
  if (successMessage) {
    return (
        <div className="toast_container success">
            <CheckCircleOutline sx={{
                fontSize: '18px',
                color: '#fff'
            }} />
            <p className="toast_text">{successMessage}</p>
        </div>
    )
  }
  if (errorMessage) {
    return (
        <div className="toast_container error">
            <ErrorOutline sx={{
                fontSize: '18px',
                color: '#fff'
            }} />
            <p className="toast_text">{errorMessage}</p>
        </div>
    )
  }
}

export default Toast