import React, { useEffect, useState } from 'react';
import './AddNewProduct.css';
import SubHeader from '../../components/subheader/SubHeader';
import ProductForm from '../../components/productForm/ProductForm';
import Toast from '../../components/toasts/Toast';

const AddNewProduct = () => {
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ showToast, setShowToast ] = useState(false);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);  
    }, 5000);
  }, [errorMessage, successMessage])

  return (
    <div className="container">
        <SubHeader 
          title='Add New Product' 
          route='/products'
        />
        <ProductForm 
          addNewProduct={false}
          name=""
          description=""
          price=""
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
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

export default AddNewProduct