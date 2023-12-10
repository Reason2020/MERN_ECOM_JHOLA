import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchAllProducts = async () => {
    const response = await axios.get(`${BASE_URL}/api/products`);
    return response.data;
}

export const fetchProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/products/${id}`);
    return response.data;
}

export const addNewProductToDB = async (name, description, price, image) => {
    //formdata for mixed types of data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('product_image', image);

    const response = await axios.post(
        `${BASE_URL}/api/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    console.log("Hey are we here?");
    return response.data;
}

export const deleteProductById = async (id) => {
    const response = await axios.delete(`${BASE_URL}/api/products/${id}`);
    return response.data;
}