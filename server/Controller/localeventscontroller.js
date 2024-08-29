import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import {Localevents} from "../models/localeventsmodel.js";

export const registerevents = catchasyncerror(async(req,res,next) => {
    const {localeventname, startdate, enddate, owner ,address ,phone,city } = req.body;

    if(!localeventname || !startdate || !enddate || !owner || !address || !phone  || !city){
        return next (new ErrorHandler("Please provide all the details",400));
    }

    const newevents = await Localevents.create({
        localeventname , startdate , enddate , owner , address , phone , city
    })

    res.status(201).json({
       success:true,
       newevents
    })
})

export const getallevents = catchasyncerror(async(req,res,next) => {
    // const events = req.user;
    const myevents = await Localevents.find({postedby:req.user._id})
    res.status(200).json({
       success:true,
       myevents
    })
})



