import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { Pet } from "../models/Lostpetsmodel.js";
import {v2 as cloudinary} from 'cloudinary'



export const registerpet = catchasyncerror(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length===0){
        return next (new ErrorHandler("Pet Image is required",400));
    }
 
    const {petsvg} = req.files;

    const allowedformat = ['image/jpeg' , 'image/png' , 'image/webp']

    if(!allowedformat.includes(petsvg.mimetype)){
       return next(new ErrorHandler("Invalid file format, upload a PNG , JPEG , WEBP format",400))   
    }

    const cloudinaryresponse = await cloudinary.uploader.upload(
        petsvg.tempFilePath,
        {folder:"Pet_folder"},
    )

    if(!cloudinaryresponse || cloudinaryresponse.error){
        return next(new ErrorHandler("Internal Error occur" , 400));
    }


    const {petname , petowner ,  phone , city , address ,reward , message } = req.body;

    if(!petname || !petowner ||  !phone || !city || !address || !reward ){
        return next(new ErrorHandler("Fill all the details",400));
    }

    const postedby = req.user._id;

    const newpet = await Pet.create({
        petname , petowner , phone , city , address , reward , postedby , message ,
        petsvg:{
            public_id: (await cloudinaryresponse).public_id,
            url:(await cloudinaryresponse).secure_url
        },
    })

    res.status(201).json({
        success:true,
        message:"Successfully Registered",
        newpet,
    })

})

export const getalluserpet = catchasyncerror(async(req,res,next) => {
    const User = req.user;
    const getalluserpet = await Pet.find({postedby:User});
    res.status(200).json({
        success:true,
        getalluserpet
    })

})

export const getallpet = catchasyncerror(async(req,res,next) => {
    const getallpet = await Pet.find({})
    res.status(200).json({
        success:true,
        getallpet
    })
})

export const deletepetpost = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const pet = await Pet.findById(id);

    if(!pet){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }
    const petsvgid = pet.petsvg.public_id;
    await cloudinary.uploader.destroy(petsvgid);
    await pet.deleteOne();

    res.status(200).json({
        success:true,
        message:"Deleted Successfully",
    })
})