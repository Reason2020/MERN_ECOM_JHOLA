import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../api/products';
import { CircularProgress } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';
import SubHeader from '../../components/subheader/SubHeader';
import { format } from 'date-fns';

const ProductDetails = () => {
    const [ product, setProduct ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { productId } = useParams();
    const navigate = useNavigate();

    //handle back button click
    const handleBackButtonClick = () => {
        navigate('/products');
    }

    //fetching product details
    const getProductDetails = async () => {
        setLoading(true);
        const response = await fetchProductById(productId);
        setProduct(response.product);
        setLoading(false);
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    if (loading) {
        return (
            <div className="loading_container">
                <CircularProgress />
            </div>
        )
    }

  return (
    <div className='container'>
        <SubHeader title='Product Details' route='/products' />
        <div className="field_container">
            <p className='field_title'>Product Id: </p>
            <p className="field_value">{product._id}</p>
        </div>
        <div className="field_container">
            <p className='field_title'>Product Name: </p>
            <p className="field_value">{product.name}</p>
        </div>
        <div className="field_container">
            <p className='field_title'>Product Description: </p>
            <p className="field_value">{product.description}</p>
        </div>
        <div className="field_container">
            <p className='field_title'>Product Price: </p>
            <p className="field_value">{product.price}</p>
        </div>
        <div className="field_container">
            <p className='field_title'>Created At: </p>
            <p className="field_value">{format(new Date(product.createdAt), "MMM d, yyyy")}</p>
        </div>
        <div className="field_container">
            <p className='field_title'>Last Updated: </p>
            <p className="field_value">{format(new Date(product.updatedAt), "MMM d, yyyy")}</p>
        </div>
        <div className="field_container">
            <p className="field_title">Product Image: </p>
            <img src={`http://localhost:3000/uploads/products/${product.image}`} alt="Product Image" className='field_image' />
        </div>
    </div>
  )
}

export default ProductDetails