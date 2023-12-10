import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Admins from './pages/admins/Admins.jsx';
import Customers from './pages/customers/Customers.jsx';
import MyProfile from './pages/myprofile/MyProfile.jsx';
import Orders from './pages/orders/Orders.jsx';
import Products from './pages/products/Products.jsx';
import ProductDetails from './pages/productDetails/ProductDetails.jsx';
import AddNewProduct from './pages/addNewProduct/AddNewProduct.jsx';

//layout that exists for the whole app
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='main_section'>
        <Sidebar />
        <div className="content_container">
          <Outlet />
        </div>
      </main>
    </>
  )
}

//router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/admins',
        element: <Admins />
      },
      {
        path: '/customers',
        element: <Customers />
      },
      {
        path: '/profile',
        element: <MyProfile />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />
      },
      {
        path: '/products/new',
        element: <AddNewProduct />
      },
      {
        path: '*',
        element: <div>404 Page Not Found</div>
      }
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
