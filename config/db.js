const mongoose = require('mongoose')
require('dotenv').config()
module.exports = connect = async() => {
   try {
        const response = await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('Connection Succeeded!');
   } catch (error) {
        console.log(error);
   }
}