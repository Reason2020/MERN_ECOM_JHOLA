import React, { useState, useEffect } from 'react';
import './ProductsTable.css';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProductById } from '../../api/products';
import { format } from 'date-fns';

const ProductsTable = ({ data, setData }) => {
    const navigate = useNavigate();

    //view product detail
    const handleProductDetailView = async (id) => {
        navigate(`/products/${id}`);
    }

    //delete product
    const handleProductDelete = async (id) => {
        try {
            const response = await deleteProductById(id);
            const productsAfterDeleting = data.filter((product) => product._id !== id);
            console.log("Deleted");
            setData(productsAfterDeleting);
        } catch (err) {
            console.log("Error", err);
        }
    }

    if (!data) return (
        <div>
            <h3>No Products</h3>
        </div>
    )

  return (
    <table className='table'>
        <thead>
            <tr>
                <th className='table_head_text'>ID</th>
                <th className='table_head_text'>Name</th>
                <th className='table_head_text'>Price</th>
                <th className='table_head_text'>Created At</th>
                <th className='table_head_text'>Last Updated</th>
                <th className='table_head_text'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                data && data.map((item) => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{format(new Date(item.createdAt), "MMM d, yyyy")}</td>
                        <td>{format(new Date(item.updatedAt), "MMM d, yyyy")}</td>
                        <td className='action_buttons_container'>
                            <button 
                                className='action_button btn_view'
                                onClick={() => handleProductDetailView(item._id)}
                                >
                                View
                            </button>
                            <button className='action_button btn_edit'>
                                <Link to={`/products/${item._id}/edit`} >Edit</Link>
                            </button>
                            <button 
                                className='action_button btn_delete'
                                onClick={() => handleProductDelete(item._id)}
                                >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
  )
}

export default ProductsTable