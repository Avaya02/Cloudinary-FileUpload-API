const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

 app.use(express.json()); //middleware

 const fileUpload = require("express-fileupload");

// app.use(fileUpload());  //file Upload ka middleware to upload file to server 
//Instead 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//connect to db
const db = require("./config/database");
db.dbConnect();

//connects to cloud
const cloudinary = require('./config/cloudenary');
cloudinary.cloudinaryConnect();

//api routes mounted
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);


app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})