const { adminModel } = require('../models/admins');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    info, error
} = require('../utils/messageLogger');

//get all admins
const getAllAdmins = async (req, res) => {
    //feature for getting all the admins
    try {
        //get all the admins in the DB
        const admins = await adminModel.find({});

        //if there are admins
        //respond with the list
        res.status(200).json({
            message: 'Get all admins',
            admins
        });
    } catch (err) {
        res.status(500).json({ message: 'Could not get all admins. Try again later' });
    }
}

//get admin by id
const getAdminById = async (req, res) => {
    //feature for getting specific admin info
    try {
        //get admin id from the request object
        const { adminId } = req.params;

        //check if the id is valid mongoose id
        const isValidId = mongoose.isValidObjectId(adminId);

        //if id is not valid
        //respond with error
        if (!isValidId) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        //find the admin based on id
        const admin = await adminModel.findById(adminId);
        
        //if there is no admin, respond with error message
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        res.status(200).json({ 
            message: `Get admin having id ${adminId}`,
            admin
        });
    } catch (err) {
        res.status(500).json({ message: 'Could not get admin info. Try again later.' });
    }
    
}

//create new admin
const addNewAdmin = async (req, res) => {
    //feature for creating new admin
    try {
        //get the admin details from the request object
        const { username, password, email, firstname, lastname, isSuperAdmin } = req.body;

        //check if username, password, email, firstname and lastname are provided
        //if not provided respond with error message
        if (!username || !password || !email || !firstname || !lastname) {
            return res.status(400).json({ message: 'Please provide all the information.' })
        }

        //HASHING
        const hashedPassword = await bcrypt.hash(password, 10);
        info('Hello there');

        //create new admin
        const newAdmin = await adminModel.create({
            username,
            password: hashedPassword,
            email,
            firstname,
            lastname,
            isSuperAdmin: isSuperAdmin || false
        });

        //respond with admin info
        res.status(201).json({ message: 'New Admin Created', newAdmin });
    } catch (err) {
        res.status(500).json({ message: 'Could not create new admin. Try again later' });
    }
}

//update admin details
const updateAdminById = async (req, res) => {
    //feature for updating admin info
    try {
        //get the admin id from the request object
        const { adminId } = req.params;

        //get the details to be updated with from the request object
        // const {  }

        // check if the admin id is valid mongoose id
        //if the id is not valid
        //respond with error message
        //update the admin details
        //if there is error when updating
        //respond with error message

    } catch (err) {

    }
}

//delete admin
const deleteAdmin = async (req, res) => {
    //feature for deleting admin from the DB
    try {
        //get the admin id from the request object
        const { adminId } = req.params;

        //check if the id is valid ID
        const isValidId = mongoose.isValidObjectId(adminId);

        //if the id is not valid, respond with error message
        if (!isValidId) {
            res.status(400).json({ message: 'Invalid ID' });
        }

        //delete the admin
        const deletedAdmin = await adminModel.findByIdAndDelete(adminId);

        res.status(200).json({
            message: 'Deleted Admin',
            deletedAdmin
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Could not delete admin. Try again later' });
    }
}

//WILL BE BACK LATER!!! GOT A TASK TO DO T_T

module.exports = {
    getAllAdmins,
    getAdminById,
    addNewAdmin,
    updateAdminById,
    deleteAdmin
};

