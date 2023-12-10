import React from 'react'
import { NavLink } from 'react-router-dom';
import {
  Dashboard,
  Person2,
  SupervisorAccount,
  PersonOutline,
  Inventory,
  ShoppingBasket
} from '@mui/icons-material';
import './Sidebar.css';

const menuItems = [
  {
      id: 1,
      title: 'Dashboard',
      route: '/',
      icon: <Dashboard fontSize='20' />
  },
  {
      id: 2,
      title: 'My Profile',
      route: '/profile',
      icon: <Person2 fontSize='20' />
  },
  {
      id: 3,
      title: 'Admins',
      route: '/admins',
      icon: <SupervisorAccount fontSize='20' />
  },
  {
      id: 4,
      title: 'Customers',
      route: '/customers',
      icon: <PersonOutline fontSize='20' />
  },
  {
      id: 5,
      title: 'Products',
      route: '/products',
      icon: <Inventory fontSize='20' />
  },
  {
      id: 6,
      title: 'Orders',
      route: '/orders',
      icon: <ShoppingBasket fontSize='20' />
  }
]

const Sidebar = () => {
  return (
    <ul className='sidebar_section'>
      {
        menuItems.map((item) => (
          <li key={item.id} className='sidebar_menuItem_section'>
            <NavLink to={item.route}>
              <div className="sidebar_menuItem_icon_container">
                {item.icon}
              </div>
              <p className="menuItem_title">{item.title}</p>
            </NavLink>
          </li>
        ))
      }
    </ul>
  )
}

export default Sidebar