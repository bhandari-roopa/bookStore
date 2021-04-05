const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors =require('cors');

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));

// app.use(function (req, res, next) {

// res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
// res.header('Access-Control-Allow-Headers', true);
// res.header('Access-Control-Allow-Credentials', 'Content-Type');
// res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// next();
// });

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err) return console.error(err)
console.log("connected to MongoDB");
})




app.use('/user', require('./routers/userRouter'));
app.use('/book', require('./routers/bookRouter'));

app.listen('3001',()=>{
    console.log("server running on port 3001")
})