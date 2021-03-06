var express = require('express');
const connect = require('./config/db')
require('dotenv').config();
var app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

// connect to mongodb
connect()

// imports routers
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const profileRouter = require('./routes/profileRoutes')


// routers
app.use('/', userRouter)
app.use('/', postRouter)
app.use('/', profileRouter)

app.listen(PORT, ()=> {
    console.log('App is running');
});