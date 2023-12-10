const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const productModel = require('../models/products');
const {
    info, error
} = require('../utils/messageLogger');

//get all products
const getAllProducts = async (req, res) => {
    //feature for getting all the products in the DB
    try {
        //get all the products
        const products = await productModel.find({});

        //respond the data
        res.status(200).json({ message: 'Get all products', products });
    } catch (err) {
        res.status(500).json({ message: "Products could not be fetched. Try again later. " });
    }
}

//add new product
const addProduct = async (req, res) => {
    //lets implement this feature for adding new product in the DB
    //first take the data from the request body
    const { name, price, description } = req.body;
    const fileInfo = req.file;
    console.log("File received: ", fileInfo);

    try {
        //check if all the necessary fields are provided
        //if not respond with necessary information
        if (!name || !price || !description || !fileInfo || !fileInfo.buffer) {
            return res.status(400).json({ message: "All the fields must be filled" });
        }

        console.log("HEre??");
        //Image Processing
        //Generate a unique filename for image in order to avoid name conflicts
        const uniqueFileName = uuid() + path.extname(fileInfo.originalname);
        console.log("Unique file name: ", uniqueFileName);

        //creating destination path for saving the image
        const destinationPath = path.join(__dirname, '..', 'uploads/products', uniqueFileName);
        console.log("Destination path: ", destinationPath);
        console.log("Are we working till here?");
        
        //save the image to the server's file system
        fs.writeFileSync(destinationPath, fileInfo.buffer);
        console.log("File written?");

        //store the product
        const imageUrl = `${uniqueFileName}`;

        //create new document with the data
        const newProduct = await productModel.create({
            name,
            price,
            description,
            image: imageUrl
        });

        //respond with the new product
        res.status(200).json({ message: 'New Product Added', addedProduct: newProduct });
    } catch (err) {
        console.log("The error message is: ", err);
        res.status(500).json({ message: "Could not add new product. Try again later.", errMessage: err });
    }
}

//get single product
const getProductById = async (req, res) => {
    //feature for getting single product item by it's id
    try {
        //get the id from the request object
        const productId = req.params.productId;

        //check if the productId is a valid id
        const isValid = mongoose.isValidObjectId(productId);

        //if the id is valid
        if (isValid) {
            //query the DB with ID
            const product = await productModel.findById(productId);

            //respond with respective product item
            return res.status(200).json({ 
                message: `Get product having id ${productId}`, 
                product 
            });
        }

        res.status(400).json({ message: "Invalid ID" });

    } catch (err) {
        res.status(500).json({ message: "Could not get the product. Try again later." });
    }
}

//update product
const updateProduct = async (req, res) => {
    //feature for updating specific product info based on it's id
    try {
        //get the product id from the request object
        const productId = req.params.productId;

        //get the data to be updated as well from the request object
        const { name, price, description } = req.body;

        //check if all the fields are provided
        //if not respond with error message
        if (!name || !price || !description) {
            return res.status(400).json({ message: 'All the fields are necessary' });
        }

        //check if the id is valid
        const isValidId = mongoose.isValidObjectId(productId);

        //if the id is valid, update the product
        if (isValidId) {
            const updatedProduct = await productModel.findByIdAndUpdate(productId, {
                name,
                price, 
                description
            });
            //respond with the updated product
            return res.status(200).json({ 
                message: `Updated product having id ${productId}`,
                updatedProduct
            });
        }

        //if the id is invalid
        res.status(400).json({ message: 'Invalid ID' });
    } catch (err) {
        res.status(500).json({ message: 'Could not update product. Try again later.' })
    }
}

//delete product
const deleteProduct = async (req, res) => {
    //feature for deleting specific product item based on product ID
    try {
        //get the product ID from the request object
        const productId = req.params.productId;

        //check if the productId is valid id
        const isValidId = mongoose.isValidObjectId(productId);

        //if id is valid, delete product from DB
        //respond with deleted message
        if (isValidId) {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            return res.status(200).json({ message: `Deleted product having id ${productId}` });
        }

        res.status(400).json({ message: 'Invalid ID' });
    } catch (err) {
        res.status(500).json({ message: 'Could not delete product. Try again later.' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}

