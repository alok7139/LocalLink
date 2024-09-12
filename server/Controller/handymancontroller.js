import { Handyman } from "../models/handyman.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/error.js";


export const registerservice = catchasyncerror(async(req,res,next) => {
    const {name, typeofservice , address , phone , fee } = req.body;

    if(!name || !typeofservice || !address || !phone || !fee){
        return next(new ErrorHandler("Please provide all the details" , 400));
    }
    console.log(req.user)
    const postedby = req.user._id;
    
    const handyman = await Handyman.create({
        name , typeofservice , address , phone , fee , postedby
    })

    res.status(201).json({
        success:true,
        message:"Service created Successfully",
        handyman
    })
})

export const userservice = catchasyncerror(async(req,res,next) => {
    const User = req.user;
    const handymanservice = await Handyman.find({postedby:User});
    res.status(201).json({
        success:true,
        handymanservice
    })
})

export const allhandymanservice = catchasyncerror(async(req,res,next) => {
    const handymanservice = await Handyman.find({});
    res.status(201).json({
        success:true,
        handymanservice
    })
})

