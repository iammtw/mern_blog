const {body, validationResult} = require('express-validator')
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userController = {
    regValidation : regsiterValidations = [
        body('name').not().isEmpty().trim().withMessage('Name is Required'),
        body('email').not().isEmpty().trim().withMessage('Email is Required'),
        body('password').not().isEmpty().trim().withMessage('Password is Required'),
        body('password').isLength({ min: 5 }).withMessage('Password must be 6 characters long'),
    ],
    loginValidation : [
        body('email').not().isEmpty().trim().withMessage('Email is Required'),
        body('password').not().isEmpty().trim().withMessage('Password is Required'),
    ],
    register : async (req,res) => {
        const {name,email, password} = req.body;
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        } 

        try {
            const checkUser = await User.findOne({ email })
            if(checkUser){
                return res.status(400).json({ errors: [{ msg: 'Email is already in use!' }] })
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            try {
                const newUser = await User.create({ name, email,password:hash })
                const token = jwt.sign({user: newUser}, process.env.SECRET, { expiresIn: '7d' })
                return res.status(200).json({ msg: 'Account is successfully Created', token})

            } catch (error) {
                return res.status(500).json({ errors: error })
            }
        } catch (error) {
            return res.status(500).json({ errors: error })
        }
        
    },
    login: async (req,res) => {
        const {email, password} = req.body;
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        } 
        try {
            const user = await User.findOne({ email })
            if(!user){
                return res.status(404).json({ errors: [{ msg: 'User not found!' }] }) 
            } else {
                console.log(password);
                const matched = await bcrypt.compare(password, user.password);
                if(!matched){
                    return res.status(401).json({ errors: [{ msg: 'Invalid Credentials!' }] })  
                } else {
                    const token = jwt.sign({user: user}, process.env.SECRET, { expiresIn: '7d' })
                    return res.status(200).json({ msg: 'Login successfully', token})
                }                
            }     
        } catch (error) {
            return res.status(400).json({ errors: error })
        }
    }
}

module.exports = userController
