import React, { useState, useEffect } from 'react';
import './Products.css';
import { Add } from '@mui/icons-material';
import ProductsTable from '../../components/productsTable/ProductsTable';
import { fetchAllProducts } from '../../api/products';
import { CircularProgress, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [ searchProductText, setSearchProductText ] = useState("");
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  
  const navigate = useNavigate();

  //fetch products
  useEffect(() => {
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
          loading ? <CircularProgress /> : <ProductsTable data={products} setData={setProducts} />
        }
      </div>
    </div>
  )
}

export default Products