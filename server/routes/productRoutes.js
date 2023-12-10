const productRoute = require('express').Router();
const multer = require('multer');
const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');

//multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

productRoute.get('/', getAllProducts);

productRoute.get('/:productId', getProductById)

productRoute.post('/', upload.single('product_image') ,addProduct);

productRoute.put('/:productId', updateProduct);

productRoute.delete('/:productId', deleteProduct);

module.exports = productRoute;