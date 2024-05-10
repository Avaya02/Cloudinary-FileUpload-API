const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
    },
    tags : {
        type : String,
    },
    email : {
        type : String,
        required :true,

    }
});

//post middleware

fileSchema.post("save", async function(doc){  //save is NODEMAILER FUNCTIONALITY 
    try{
        console.log("DOC",doc);

       //transporter

        let transporter = nodemailer.createTransport ({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            },
        });

        const info = transporter.sendMail({
            from:  `CodeHelp`,
            to : doc.email,
            subject : "New file uploaded on cloudinary",
            html : `<h2>Hello Jee</h2>  <p> File uploaded View here : <a href="${doc.imageUrl}"> ${doc.imageUrl} </a> </p> `  //href attribute contains the link and 
            // the a tag content contains the url which will be shown on screen

            //on passing imageUrl in the database in the controller code an error is occurring thats why image url is not accessible 

        })

        console.log(info);

    }
    catch(error){
        console.error(error);
    }
})

const File =  mongoose.model('File', fileSchema);
module.exports = File;
// module.exports = mongoose.model("File",fileSchema);