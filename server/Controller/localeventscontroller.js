import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import {Localevents} from "../models/localeventsmodel.js";

export const registerevents = catchasyncerror(async(req,res,next) => {
    const {localeventname, startdate, enddate, owner ,address ,phone,city } = req.body;

    if(!localeventname || !startdate || !enddate || !owner || !address || !phone  || !city){
        return next (new ErrorHandler("Please provide all the details",400));
    }

    const postedby = req.user._id;

    const newevents = await Localevents.create({
        localeventname , startdate , enddate , owner , address , phone , city, 
        postedby
    })

    res.status(201).json({
       success:true,
       newevents
    })
})

export const getalluserevents = catchasyncerror(async(req,res,next) => {
    const User = req.user;
    const myevents = await Localevents.find({postedby:User});
    res.status(200).json({
       success:true,
       myevents
    })
})

export const updatevents = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    let events=  await Localevents.findById(id);
    if(!events){
        return next(new ErrorHandler("😅 Oops, Events is not found",400));
    }
    events = await Localevents.findByIdAndUpdate(id , req.body , {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        events,
        message: "Updated successfully"
    })
})

export const deleteevents = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const events = await Localevents.findById(id);
    if(!events){
        return next(new ErrorHandler("😅 Oops, Events is not found",400));
    }
    await events.deleteOne();
    res.status(200).json({
        success:true,
    })
})




