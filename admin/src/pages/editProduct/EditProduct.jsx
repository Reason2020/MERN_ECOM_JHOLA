import React, { useEffect, useState } from 'react';
import './EditProduct.css';
import SubHeader from '../../components/subheader/SubHeader';
import ProductForm from '../../components/productForm/ProductForm';
import Toast from '../../components/toasts/Toast';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/products';

const EditProduct = () => {
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ showToast, setShowToast ] = useState(false);
  const [ product, setProduct ] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await fetchProductById(productId);
      console.log("Response: ", response);
      setProduct(response.product);
    }
    getProductById();
  }, []);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);  
    }, 5000);
  }, [errorMessage, successMessage])

  return (
    <div className="container">
        <SubHeader 
          title='Edit Product' 
          route='/products'
        />
        {product && (
          <ProductForm 
            addNewProduct={false}
            name={product?.name}
            description={product?.description}
            price={product?.price}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        )}
        {
          showToast && (
            <Toast 
              successMessage={successMessage} 
              errorMessage={errorMessage} 
            />
          )
        }
    </div>
  )
}

export default EditProduct