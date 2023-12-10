const adminRoutes = require('express').Router();
const {
    getAllAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdmin
} = require('../controllers/admins');

//get all admin route
adminRoutes.get('/', getAllAdmins);

//get specific admin by admin route
adminRoutes.get('/:adminId', getAdminById);

//add new admin route
adminRoutes.post('/', addNewAdmin);

//update admin details route
adminRoutes.put('/:adminId', updateAdminById);

//delete admin route
adminRoutes.delete('/:adminId', deleteAdmin);

module.exports = adminRoutes;