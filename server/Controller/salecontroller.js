import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { Sales } from "../models/salesmodel.js";
import {v2 as cloudinary} from 'cloudinary'


export const registersale = catchasyncerror(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length ===0 ){
        return next(new ErrorHandler("Image is required",400));
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

    const {name , phone, address , salecost , description } = req.body;

    if(!name  || !phone || !address || !salecost || !description){
        return next(new ErrorHandler("Please provide all details",400));
    }

    const postedby = req.user._id;

    const newsale = await Sales.create({
        name, address , phone , description  ,salecost, postedby,
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

export const fetchsaledetails = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const saleservice = await Sales.findById(id);
    if(!saleservice){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }
    res.status(200).json({
        success:true,
        saleservice
    })
}) 

export const allsales = catchasyncerror(async(req,res,next) => {
    const allsale = await Sales.find({})
    res.status(200).json({
        success:true,
        allsale
    })
})

export const usersale = catchasyncerror(async(req,res,next) => {
    const allusersale = await Sales.find({postedby:req.user._id});
    res.status(201).json({
        success:true,
        allusersale
    })
})

export const deletesale = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const deletesale = await Sales.findById(id);

    if(!deletesale){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }

    const cloudinaryid = deletesale.salesvg.public_id;
    await cloudinary.uploader.destroy(cloudinaryid);
    await deletesale.deleteOne();
    res.status(200).json({
        success:true,
        message:"Successfully Deleted",
    })
})

export const updatesaleservice = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const updatesale = {
        name: req.body.name,
        salecost: req.body.salecost,
        phone: req.body.phone,
        address:req.body.address,
        description: req.body.description,

    }

    if(req.files && req.files.salesvg){
        const salebanner = req.files.salesvg;
        const sale = await Sales.findById(id);
        
        const bannerid =  sale.salesvg.public_id;
        await cloudinary.uploader.destroy(bannerid);

        const cloudinaryresponse =  cloudinary.uploader.upload(
            salebanner.tempFilePath,
            {folder:"Sale_folder"},
        )

        updatesale.salesvg = {
            public_id : (await cloudinaryresponse).public_id,
            url: (await cloudinaryresponse).secure_url
        }
    }

    const updated = await Sales.findByIdAndUpdate(id , updatesale , {
        new:true,
        runValidators:true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
        message: "Updated Successfully",
        updated
    })

})