import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { Garden } from "../models/Gardening.js";
import  {v2 as cloudinary } from 'cloudinary'

export  const registergarden = catchasyncerror(async(req,res,next) => {

    if(!req.files || Object.keys(req.files).length === 0 ){
        return next(new ErrorHandler("Garden post is required", 400));
    }

    const {gardensvg} = req.files;

    const allowedformats =  ['image/png' , 'image/jpeg' , 'image/webp'];

    if(!allowedformats.includes(gardensvg.mimetype)){
        return next(new ErrorHandler("Invalid file format, upload a PNG , JPEG , WEBP format",400))
    }

    const cloudinaryresponse = cloudinary.uploader.upload(
        gardensvg.tempFilePath,
        {folder: "garden_svg"}
    )

    if(!cloudinaryresponse || cloudinaryresponse.error){
        return next(new ErrorHandler("Internal server error!",400));
    }

    const {houseowner , salary , posteddate, city , phone , address   } = req.body;

    if(!houseowner || !salary || !posteddate || !city || !phone || !address){
        return next(new ErrorHandler("Provide all the details",400));
    }
    const postedby = req.user._id;
    const garden = await Garden.create({
        houseowner , salary , posteddate , city, phone , address , postedby , 
        gardensvg:{
            public_id : (await cloudinaryresponse).public_id,
            url: (await cloudinaryresponse).secure_url
        }
    })

    res.status(201).json({
        success:true,
        message: "Garden Service Created Successfully",
        garden
    })
})

export const getallgarden = catchasyncerror(async(req,res,next) => {
    const gardens = await Garden.find({});
    res.status(201).json({
        sucess:true,
        gardens,
    })
});

export const getallusergarden = catchasyncerror(async(req,res,next) => {
    const User=  req.user;
    const garden = await Garden.find({postedby:User});
    res.status(201).json({
        success:true,
        garden,
    })
})

export const deleteservice = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const garden = await Garden.findById(id);

    if(!garden){
        return next(new ErrorHandler("😅 Oops, Events is not found",400));
    }
    const gardensvgid = garden.gardensvg.public_id;
    await cloudinary.uploader.destroy(gardensvgid);
    await garden.deleteOne();
    res.status(201).json({
        sucess:true,
        message: "Service Deleted Successfully",
    })
})