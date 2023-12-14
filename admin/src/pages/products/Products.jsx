import React, { useState, useEffect } from 'react';
import './Products.css';
import { Add } from '@mui/icons-material';
import ProductsTable from '../../components/productsTable/ProductsTable';
import { fetchAllProducts } from '../../api/products';
import { CircularProgress, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

//DUMMY DATA
const dummyData = [
  {
    _id: "12345",
    name: "Dummy Item 1",
    price: 123,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "22345",
    name: "Dummy Item 2",
    price: 123,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "32345",
    name: "Dummy Item 3",
    price: 123,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "42345",
    name: "Dummy Item 4",
    price: 123,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "52345",
    name: "Dummy Item 5",
    price: 123,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const Products = () => {
  const [ searchProductText, setSearchProductText ] = useState("");
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ currentPageNumber, setCurrentPageNumber ] = useState(1);
  
  const navigate = useNavigate();

  //fetch products
  useEffect(() => {
    //CHANGE THIS
    getAllProducts();
    setLoading(false);
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    const data = await fetchAllProducts();
    if (data?.products) {
      setProducts(data.products);
    }
  }

  //navigate to add new products page
  const handleAddNewProductButtonClick = () => {
    navigate('/products/new');
  }

  //calculate total number of pages
  const calculateTotalNumberOfPages = () => {
    if (products) {
      return Math.ceil(products.length / 10);
    }
  } 

  return (
    <div className='container'>
      <div className="title_container">
        <h2 className="title">Products</h2>
      </div>
      <div className="main_actions_container">
        <input 
              type='text' value={searchProductText} 
              onChange={(e) => setSearchProductText(e.target.value)}
              placeholder='Search Product By Name'
              className='search_field' />
        <button 
          className='add_product_button'
          onClick={handleAddNewProductButtonClick} >
            <Add />
            Add New Product
        </button>
      </div>
      <div className="products_table_container">
        {
          loading ? <CircularProgress /> : (
            <ProductsTable 
              data={products} 
              setData={setProducts}
              currentPageNumber={currentPageNumber}
              totalPages={calculateTotalNumberOfPages()} />
          )
        }
      </div>
      <Pagination 
        currentPageNumber={currentPageNumber} 
        setCurrentPageNumber={setCurrentPageNumber} 
        totalNumberOfPages={calculateTotalNumberOfPages()}/>
    </div>
  )
}

export default Products