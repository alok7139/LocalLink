import { User } from "../models/usermodel.js";
import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";

export const register = catchasyncerror(async(req,res,next) => {
    const {name,lastname,email,phone,password,country} = req.body;

    if(!name || !lastname || !email || !phone || !password || !country){
        return next(new ErrorHandler("Fill all the details", 400));
    }

    const isemail = await User.findOne({email});
    if(isemail){
        return next(new ErrorHandler("User already registered",400));
    }

    const user = await User.create({
        name,email,phone,country,password,lastname

    })

    res.status(200).json({
        success:true,
        message:"Thanks for choosing us"
    })


})

export const login = catchasyncerror(async(req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next (new ErrorHandler("Please provide all details",400));
    }

    const verifyemail = await User.findOne({email}).select("+password");
    if(!verifyemail){
        return next(new ErrorHandler("User not registered with us",400));
    }
    
    const comparepassword = await verifyemail.comparepassword(password);
    if(!comparepassword){
        return next(new ErrorHandler("Credentials is not valid",400));
    }

    res.status(200).json({
        success:true,
        message:"Welcome to the community",
    })
})