const File =  require("../models/File");
const cloudinary = require("cloudinary").v2;  //instance to access it

//localfileUpload ---> Handler Function

exports.localFileUpload = async(req,res) =>{
    try{
        const file = req.files.file // iss heirarchy se file fetch hogi in course documentation mai btaya hai  
  // we also have to store this "file" in key in form-data of POSTMAN



        
        console.log( "Here is the file---->",file);

        //create a path where file needs to be stored on server
        let path = __dirname  + "/files/" + Date.now() + `.${file.name.split('.')[3]}` ; // current directory
        console.log("Path--->",path);

        //add path to the move function 
        
        file.mv(path , (err)=>{    //upload ke liy move wala fumction is needed
            console.log(err);
        });
        
        //create successful response
        res.json({
            success : true,
            message : 'Local File Uploaded Successfully',
        });

    }

    catch(error){
        console.log(error);

    }
}

function isFileTypeSupported (type, supportedTypes){
    return  supportedTypes.includes(type);   // it'll check if that array includes the parameter or not
}

// following uploading method is explained in the IN COURSE ARTICLE , TAKE A LOOK ---
async function uploadFiletoCloudenary(file,folder){
    const options = {folder};
      
    options.resource_type = "auto";    // Without this it wont give successful response in postman

    return await cloudinary.uploader.upload(file.tempFilePath,options);   //DOUBT

    
}



//image handler

exports.imageUpload = async (req,res) =>{
    try{
        //data fetch 
        const{name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;  //this file at 3rd index represents name/key you give your file in the postman while sending
        console.log(file);


        //validation
        const supportedTypes = ["jpg", "jpeg" ,"png"];

        const fileType = file.name.split('.')[1].toLowerCase();    //.toLowerCase(); --

        if(!isFileTypeSupported(fileType,supportedTypes)){

            return  res.status(400).json({
                success : false,
                message : "File format not supported",
            });
        }

         //file format supported hai
         console.log("Uploading to Codehelp");

        const response = await uploadFiletoCloudenary(file,"CodeHelp");  // it is the response returned by the function declared above universally
        console.log(response);    

        //  to save entry in Database
        const fileData = await File.create({
            name,
            tags,
            email,
           imageUrl : response.secure_url,
        });       
        //   ------Issue in saving in Database

        

        res.json({
            success : true,
            imageUrl : response.secure_url,
            message : "Image successfully uploaded",
            
        });




    }

    catch(error){
        console.error(error);
        res.status(400).json({
            success : false,
            message : "Something Went wrong",
        })

    }
}


exports.videoUpload = async (req,res) =>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;  
        
        //validation
        const supportedTypes = ["mp4" ,"mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "Filetype not supported"
            });
        }

        const response = await uploadFiletoCloudenary(file,"CodeHelp"); 
        console.log(response);

        res.json({
            success : true,
            imageUrl : response.secure_url,
            message : "Video successfully uploaded",
            
        });



    }

    catch(error){
        console.error(error);
        res.json({
            success : false,
            message : "Something went wrong",
        })

    }
}

//Image Size reducer 

exports.imageReducer = async (req,res) =>{
    try{
        

    }

    catch(error){

    }
}
