const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect =  async ()=>{
    try{
        cloudinary.config({  //these things are required to connect to CLoudenary which are from CLoudenary documentation
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        });

    }

    catch(error){
        console.log(error);
    }
}