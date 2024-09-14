import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { Sales } from "../models/salesmodel.js";
import {v2 as cloudinary} from 'cloudinary'


export const registersale = catchasyncerror(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length ===0 ){
        return next(new ErrorHandler("Image of Object required",400));
    }

    const {salesvg} = req.files;

    const allowedformats =  ['image/png' , 'image/jpeg' , 'image/webp'];

    if(!allowedformats.includes(salesvg.mimetype)){
        return next(new ErrorHandler("Invalid file format, upload a PNG , JPEG , WEBP format",400))
    }

    const cloudinaryresponse = cloudinary.uploader.upload(
        salesvg.tempFilePath,
        {folder:"Sale_folder"}
    )

    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.log("cloudinary Error" , cloudinaryresponse.error || "Unknown cloudinary response");
        return next(new ErrorHandler("Failed to upload Image!" , 500));
    };

    const {name , phone, address , date , description } = req.body;

    if(!name  || !phone || !address || !date || !description){
        return next(new ErrorHandler("Please provide all details",400));
    }

    const postedby = req.user._id;

    const newsale = Sales.create({
        name, address , phone , description  ,date,
        salesvg:{
            public_id: (await cloudinaryresponse).public_id,
            url: (await cloudinaryresponse).secure_url
        }
    })

    res.status(201).json({
        success:true,
        message:"Successfully Posted",
        newsale
    })



})