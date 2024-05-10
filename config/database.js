  const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL ,{
      
    })
    .then( () => {
        console.log("DB connections Successful")
})
    .catch( (error) =>{
        console.log("Db connection issues");
        console.log(error);
        process.exit(1); //0 means end the process without any kind of failure and 1 means end the process with some failure.
    });
};