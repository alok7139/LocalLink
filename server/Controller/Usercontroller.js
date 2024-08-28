import { User } from "../models/usermodel.js";
import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import { sendtoken } from "../utility/createtoken.js";

export const register = catchasyncerror(async(req,res,next) => {
    const {name,lastname,email,phone,password,dob , gender} = req.body;

    if(!name || !lastname || !email || !phone || !password  || !dob || !gender){
        return next(new ErrorHandler("Please provide all details", 400));
    }

    const isemail = await User.findOne({email});
    if(isemail){
        return next(new ErrorHandler("User already registered",400));
    }

    const user = await User.create({
        name,email,phone,password,lastname,dob,gender

    })

    sendtoken(user,"Thanks for choosing us" , res,201)


})

export const login = catchasyncerror(async(req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next (new ErrorHandler("Please provide all details",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User not registered with us",400));
    }
    
    const comparepassword = await user.comparepassword(password);
    if(!comparepassword){
        return next(new ErrorHandler("Credentials is not valid",400));
    }

    sendtoken(user,"Welcome to the community" , res,201)
})

export const logout = catchasyncerror(async(req,res,next) => {
    res.status(201).cookie("token" , "", {
        expires: new Date(Date.now()),
        httpOnly:true,
        sameSite:"None",
        secure:true,
    }).json({
        success:true,
        message:"Thanks for serving you"
    })
})

export const getuser = catchasyncerror(async(req,res,next) => {
    const user = req.user;
    res.status(201).json({
        success:true,
        user
    })
})