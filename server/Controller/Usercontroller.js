import { User } from "../models/usermodel.js";
import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";

export const register = catchasyncerror(async(req,res,next) => {
    const {name,lastname,email,phone,password,country} = req.body();

    if(!name || !lastname || !email || !phone || !password || !country){
        return next(new ErrorHandler("Fill all the details", 400));
    }

    const isemail = User.findOne(email);
    if(isemail){
        return next(new ErrorHandler("User already registered",400));
    }
    
})