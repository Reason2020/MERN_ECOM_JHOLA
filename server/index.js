//imports
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const productRouteHandler = require('./routes/productRoutes');
const adminRouteHandler = require('./routes/adminRoutes');
const path = require('path');
const { 
    info,
    error
} = require('./utils/messageLogger');
const requestLogger = require('./middlewares/requestLogger');

//some variables
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//middlewares
app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
//product routes
app.use('/api/products', productRouteHandler);

//admin routes
app.use('/api/admins', adminRouteHandler);

//database connection and server configuration
const main = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        info(`Database connection successful`);
        app.listen(PORT, () => {
            info(`Server listening at port ${PORT}`);
        });
    } catch (err) {
        error(`Database connection failed: ${err}`);
    }
}

main();