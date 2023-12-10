import React, { useState } from 'react'
import { Add } from '@mui/icons-material';
import { addNewProductToDB } from '../../api/products';
import './ProductForm.css';

const ProductForm = ({ addNewProduct, name, description, price, setSuccessMessage, setErrorMessage }) => {
    const [ productName, setProductName ] = useState(name);
    const [ productDescription, setProductDescription ] = useState(description);
    const [ productPrice, setProductPrice ] = useState(price);
    const [ productImage, setProductImage ] = useState(null);
    const [ clientSideImageUrl, setClientSideImageUrl ] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            console.log("Heyyy");
            const response = await addNewProductToDB(productName, productDescription, productPrice, productImage);
            console.log("Do we reach here?");
            if (response.addedProduct) {
                setProductName("");
                setProductDescription("");
                setProductPrice("");   
                setProductImage(null);
                setSuccessMessage(response.message);
            }
        } catch (er) {
            console.log(er);
            setErrorMessage(response.message);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProductImage(file);
            setClientSideImageUrl(imageUrl);
        }
    }

  return (
    <form onSubmit={handleAddProduct} encType='multipart/form-data'>
        <div className="form_field">
            <label htmlFor="name">Product Name</label>
            <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)} 
                placeholder='E.g. University Physics' />
        </div>
        <div className="form_field">
            <label htmlFor="description">Product Description</label>
            <textarea 
                rows="4" 
                value={productDescription} 
                onChange={(e) => setProductDescription(e.target.value)} ></textarea>
        </div>
        <div className="form_field">
            <label htmlFor="price">Product Price</label>
            <input 
                type="number" 
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)} 
                placeholder='E.g. 123' />
        </div>
        <div className="form_field_image">
            <label htmlFor="image">Select Product Image</label>
            <input 
                type="file" 
                name="product_image" 
                className='input_field'
                onChange={handleImageChange}/>
            {productImage && (
                <img src={clientSideImageUrl} alt="Image of Product" className='client_side_image' />
            )}
        </div>
        <button type='submit' className='btn_submit'>
            <Add sx={{
                fontSize: '18px',
                color: 'white'
            }} />
            <p className='btn_text'>Add Product</p>
        </button>
    </form>
  )
}

export default ProductForm