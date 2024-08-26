import { Message } from "../models/contactmodel.js";
import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";

export const message = catchasyncerror(async(req,res,next) => {
    const {name , email , phone , message} = req.body;

    if(!name || !email || !phone || !message){
        return new ErrorHandler("Fill all the details" , 400);
    }

    await Message.create({name ,email , phone , message});

    return res.status(201).json({
        success:true,
        message:"Thanks for your query"
    })
})




