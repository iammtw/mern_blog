const {body, validationResult} = require('express-validator')
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const profileController = {
    updateName : async (req,res) => {
        const {name, id} = req.body;
        if(name === ''){
            console.log('name is empty');
            return res.status(400).json({ errors: [{ msg: 'Name is required' }]  });
        } else {
            try{
                const user = await User.findOneAndUpdate({ _id: id}, { name: name }, {new:true})
                const token = jwt.sign({user}, process.env.SECRET, { expiresIn: '7d' })
                return res.status(200).json({ msg: 'Your name has been Updated', token})
            } catch(error) {
                return res.status(500).json({ error });
            }
        }
        
    },
    updatePasswordValidations : [
        body('current').not().isEmpty().trim().withMessage('Current Password is Required'),
        body('newPassword').not().isEmpty().trim().withMessage('Password is Required'),
        body('newPassword').isLength({ min: 5 }).withMessage('Password must be 6 characters long'),
    ],
    updatePassword : async (req,res) => {
        const {current, newPassword, userId} = req.body;
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
        } else {
            const user = await User.findOne({ _id: userId })
            if(!user){
                return res.status(404).json({ errors: [{ msg: 'User not found!' }] }) 
            } else {
                const matched = await bcrypt.compare(current, user.password);
                if(!matched){
                    return res.status(401).json({ errors: [{ msg: 'Current Password doesnot matched!' }] })  
                } else {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hash = await bcrypt.hash(newPassword, salt)
                        const newUser = await User.findOneAndUpdate({ _id: userId }, { password: hash  }, {new:true})
                        return res.status(200).json({ msg: 'Your password has been Updated'})
                    } catch (error) {
                        return res.status(500).json({ error });
                    }
                    
                }                
            }  
        }        
    },
        
}

module.exports = profileController
