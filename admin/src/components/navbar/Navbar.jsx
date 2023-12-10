import React from 'react'
import {
    ShoppingBag,
    Bedtime,
    Notifications,
    Person
} from '@mui/icons-material';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='logo_section'>
            <div className="logo_icon_section">
                <ShoppingBag 
                    sx={{
                        color: '#FBB043',
                        fontSize: 40
                    }} />
            </div>
            <h1 className='logo_title_section'>
                JHOLA ADMIN
            </h1>
        </div>
        <div className="actions_section">
            <div className="actions_icon_container theme">
                <Bedtime 
                    sx={{
                        fontSize: 25,
                        color: '#2188de'
                    }}
                />
            </div>
            <div className="actions_icon_container notification">
                <Notifications 
                    sx={{
                        fontSize: 25,
                        color: '#DF2A20'
                    }}
                />
            </div>
            {/* TODO: Later Change this to User Profile */}
            <div className="actions_icon_container user">
                <Person 
                    sx={{
                        fontSize: 25,
                        color: '#17E83A'
                    }}
                />
            </div>
        </div>
    </nav>
  )
}

export default Navbar