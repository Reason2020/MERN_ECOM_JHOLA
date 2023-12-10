import React, { useEffect } from 'react'
import { KeyboardBackspace } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import './SubHeader.css';

const SubHeader = ({ title, route }) => {
    const navigate = useNavigate();

    //navigate to a path
    const handleBackButtonClick = () => {
        navigate(route);
    }

  return (
    <div className="subheader_container">
        <button className='btn_back' onClick={handleBackButtonClick}>
            <KeyboardBackspace sx={{
                fontSize: '1.5rem'
            }} />
        </button>
        <p className="title">{title}</p>
    </div>
  )
}

export default SubHeader