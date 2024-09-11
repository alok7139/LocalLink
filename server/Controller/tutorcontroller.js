import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import {Tutor} from '../models/Tutormodel.js'
import { Booktutor } from "../models/booktutor.js";

export const registertutor = catchasyncerror(async(req,res,next) => {
    const {tutorname, tutorfee , typeoftutor , subject  ,time  , phone} = req.body;

    if(!tutorname || !tutorfee || !typeoftutor || !time || !subject || !phone){
       return next(new ErrorHandler("Provide all the details" , 400));
    }
    
    const postedby = req.user._id;

    const tutor = await Tutor.create({
        tutorfee , tutorname , typeoftutor  , subject, postedby , time , phone
    })

    res.status(201).json({
        success:true,
        message:"Your Profile Created",
        tutor
    })

})

export const getallusertutor = catchasyncerror(async(req,res,next) => {
    const {id} = req.user;
    const allusertutor = await Tutor.find({postedby:id}); 
    res.status(200).json({
        success:true,
        allusertutor
    })
})

export const getalltutor = catchasyncerror(async(req,res,next) => {
    const getalltutor = await Tutor.find({});
    res.status(200).json({
        success:true,
        getalltutor
    })
})

export const deleteusertutor = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const tutorservice = await Tutor.findById(id);

    if(!tutorservice){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }

    await tutorservice.deleteOne();
    res.status(200).json({
        success:true,
        message:"Deleted Successfully",
    })
})

export const fetchservice = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const tutorservice = await Tutor.findById(id);
    if(!tutorservice){
        return next (new ErrorHandler("😅 Oops, This Service is not avaliable any more",400))
    }
    res.status(200).json({
        sucess:true,
        tutorservice
    })
})

export const booktutor = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const tutorval = await Tutor.findById(id);
    const {name , email , classtype , phone} = req.body;

    if(!tutorval){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more" , 400));
    }

    const userid = req.user._id;

    const existbook = await Booktutor.findOne({user:userid , tutor:id });

    if(existbook){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }

    const booking = await Booktutor.create({
        name , email , classtype , phone , user:userid , tutor:id
    })

    res.status(201).json({
        success:true,
        message:`Your Service is Booked ${name}`,
        booking
    })

})

export const updatetutor = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    
    const updatetutor = {
        tutorname: req.body.tutorname,
        tutorfee: req.body.tutorfee,
        subject: req.body.subject,
        typeoftutor: req.body.typeoftutor,
        time: req.body.time,
        phone:req.body.phone

    }

    const tutor = await Tutor.findByIdAndUpdate(id , updatetutor , {
        new:true,
        runValidators:true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
        message:"Your request updated Successfully",
        tutor
    })
    
})