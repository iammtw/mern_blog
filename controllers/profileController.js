const {body, validationResult} = require('express-validator')
const User = require('../models/user');
require('dotenv').config()

const userController = {
    updateName : async (req,res) => {
        const {name} = req.body;
        console.log(name);
        
    },
    
}

module.exports = userController
