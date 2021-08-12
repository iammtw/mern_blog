
const { errors } = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const formidable = require('formidable')
const {body, validationResult} = require('express-validator')
const { convert } = require('html-to-text');
const Post = require('../models/post');
const postController = {
    createPost : (req,res)=> {
        const form = formidable({multiples: true})
        form.parse(req, async (error, fields, files)=> {
            const  { title, body, description, slug, id, name } = fields;
            const errors =[];
            if(title === ''){
                errors.push({ msg: 'Title is Required' })
            }
            if(body === ''){
                errors.push({ msg: 'body is Required' })
            }
            if(description === ''){
                errors.push({ msg: 'description is Required' })
            }
            if(slug === ''){
                errors.push({ msg: 'slug is Required' })
            }

            if(Object.keys(files).length == 0){
                errors.push({ msg: 'Image is Required' })
            } else {
                const { type } = files.image;
                const split = type.split('/');
                const extension = split[1].toLowerCase();
                if(extension !== 'jpeg'&& extension !== 'jpg' && extension !== 'png'){
                        errors.push({ msg: `${extension} is not a valid extension.` })
                } else {
                    files.image.name = uuidv4() + '.' + extension;
                }
            }

            const checkSlug = await Post.findOne({ slug });
            if(checkSlug){
                errors.push({ msg: 'Please Check a unique slug/URL ' })
            }

            if(errors.length !== 0){
                return res.status(400).json({ errors })
            }  else {
                const newPath = __dirname + `/../client/public/images/${files.image.name}`
                fs.copyFile(files.image.path, newPath, async (error)=> {
                    if(!error){
                        try {
                            const response = await Post.create({
                                title, body, image:files.image.name, description, slug, userName: name, userId: id
                            })
                            return res.status(200).json({ msg: 'Your Post has been created successfully.', response })
                        } catch (error) {
                            return res.status(500).json({ errors: error,msg: error.message  })
                        }
                    }
                })
            }         
        }) 
    },
    fetchPosts: async (req,res) => {
        const id = req.params.id;
        const page = req.params.page;
        const perPage = 3;
        const skip = (page - 1) * perPage;
        try {
            const count = await Post.find({ userId: id }).countDocuments();
            const response = await Post.find({ userId: id }).skip(skip).limit(perPage).sort({ updatedAt: -1 });
            return res.status(200).json({ response: response, count, perPage })
        } catch (error) {
            return res.status(500).json({ errors: error,msg: error.message  })
        }
    },
    fetchPost : async (req,res) => {
        const id = req.params.id;
        try {
            const response = await Post.findOne({_id:id});
            return res.status(200).json({ response: response })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ errors: error,msg: error.c  })
        }
    },
    updateValidations : [
        body('title').notEmpty().trim().withMessage('Title is Required'),
        body('body').notEmpty().trim().custom(value => {
            let bodyValue = value.replace(/\n/g,'');
            if(convert(bodyValue).trim().length === 0){
                return false;
            } else {
                return true;
            }
        }).withMessage('Body is Required'),
        body('description').not().isEmpty().trim().withMessage('Descritpion is Required'),
    ],
    updatePost : async (req,res) => {
        const { title, body, description, id } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        } 
        try {
            const response = await Post.findByIdAndUpdate(id, {
                title, body, description
            });
            return res.status(200).json({ msg: "Your Post has been Updated" })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ errors: error,msg: error.c  })
        }
    },
    updateImage : async (req,res) => {
        const form = formidable({multiples: true})
        form.parse(req, async (error, fields, files)=> {
            const  { id } = fields;
            const errors =[];

            if(Object.keys(files).length == 0){
                errors.push({ msg: 'Image is Required' })
            } else {
                const { type } = files.image;
                const split = type.split('/');
                const extension = split[1].toLowerCase();
                if(extension !== 'jpeg'&& extension !== 'jpg' && extension !== 'png'){
                        errors.push({ msg: `${extension} is not a valid extension.` })
                } else {
                    files.image.name = uuidv4() + '.' + extension;
                }
            }

            if(errors.length !== 0){
                return res.status(400).json({ errors })
            }  else {
                const newPath = __dirname + `/../client/public/images/${files.image.name}`
                fs.copyFile(files.image.path, newPath, async (error)=> {
                    if(!error){
                        try {
                            const response = await Post.findByIdAndUpdate(id, { image:files.image.name })
                            return res.status(200).json({ msg: 'Your Post has been updated successfully.', response })
                        } catch (error) {
                            return res.status(500).json({ errors: error,msg: error.message  })
                        }
                    }
                })
            }         
        }) 
    }
}

module.exports = postController;