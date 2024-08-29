import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import {Localevents} from "../models/localeventsmodel.js";

export const registerevents = catchasyncerror(async(req,res,next) => {
    const {localeventname, startdate, enddate, owner ,address ,phone } = req.body;

    if(!localeventname || !startdate || !enddate || !owner || !address || !phone){
        return next (new ErrorHandler("Please provide all the details",400));
    }

    const newevents = await Localevents.create({
        localeventname , startdate , enddate , owner , address , phone
    })

    res.status(201).json({
       success:true,
       newevents
    })
})