import ErrorHandler from "../middlewares/error.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import {Localevents} from "../models/localeventsmodel.js";
import {v2 as cloudinary} from 'cloudinary'
import { Booking } from "../models/Bookevent.js";


export const registerevents = catchasyncerror(async(req,res,next) => {
    
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Event Post is required",400));
    }

    const {localeventsvg} = req.files;

    const allowedformats =  ['image/png' , 'image/jpeg' , 'image/webp'];

    if(!allowedformats.includes(localeventsvg.mimetype)){
        return next(new ErrorHandler("Invalid file format, upload a PNG , JPEG , WEBP format",400))
    }
    
    const cloudinaryresponse = await cloudinary.uploader.upload(
        localeventsvg.tempFilePath,
        {folder: "localevent_image"},
    );

    if(!cloudinaryresponse || cloudinaryresponse.error){
        console.log("cloudinary Error" , cloudinaryresponse.error || "Unknown cloudinary response");
        return next(new ErrorHandler("Failed to upload Image!" , 500));
    };



    const {localeventname, startdate, enddate, owner ,address ,phone,city } = req.body;

    if(!localeventname || !startdate || !enddate || !owner || !address || !phone  || !city){
        return next (new ErrorHandler("Please provide all the details",400));
    }

    const postedby = req.user._id;

    const newevents = await Localevents.create({
        localeventname , startdate , enddate , owner , address , phone , city, 
        postedby , 
        localeventsvg:{
            public_id : cloudinaryresponse.public_id,
            url:cloudinaryresponse.secure_url,
        }
    })

    res.status(201).json({
       success:true,
       message: "Event Posted Successfully",
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

export const allevents = catchasyncerror(async(req,res,next) => {
    const events = await Localevents.find({})
    res.status(200).json({
        success:true,
        events
    })
})


export const updatevents = catchasyncerror(async (req, res, next) => {
    const updatedevent = {
        localeventname: req.body.localeventname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        owner: req.body.owner,
        address: req.body.address,
        phone: req.body.phone,
        city: req.body.city,
    };

    // Check if a new image file is uploaded
    if (req.files && req.files.localeventsvg) {
        const eventbanner = req.files.localeventsvg;
        const event = await Localevents.findById(req.params.id);

        // Destroy the previous image from Cloudinary
        const eventsbannerid = event.localeventsvg.public_id;
        await cloudinary.uploader.destroy(eventsbannerid);

        // Upload the new image to Cloudinary
        const cloudinaryresponse = await cloudinary.uploader.upload(
            eventbanner.tempFilePath,
            { folder: "localevent_image" }
        );

        // Update the localeventsvg field with the new image details
        updatedevent.localeventsvg = {
            public_id: cloudinaryresponse.public_id,
            url: cloudinaryresponse.secure_url,
        };
    }

    // Update the event in the database
    const events = await Localevents.findByIdAndUpdate(req.params.id, updatedevent, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    // Send response
    res.status(200).json({
        success: true,
        events,
        message: "Updated successfully",
    });
});


export const deleteevents = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const events = await Localevents.findById(id);
    if(!events){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }
    const localeventimageid = events.localeventsvg.public_id;
    await cloudinary.uploader.destroy(localeventimageid);
    await events.deleteOne();
    res.status(200).json({
        success:true,
        message:"Deleted Successfully",
    })
})

export const fetchdetails = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const events = await Localevents.findById(id);
    if(!events){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more",400));
    }
    res.status(201).json({
        success:true,
        events
    })
})

export const bookevent = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const {name,email,phone} = req.body;
    const userid = req.user._id;
    const event = await Localevents.findById(id);

    if(!event){
        return next(new ErrorHandler("😅 Oops, This Service is not avaliable any more", 400));
    }

    const existingBooking = await Booking.findOne({ event: id, user: userid ,  });

    if (existingBooking) {
        return next(new ErrorHandler("You have already booked this event.", 400));
    }

    const booking = await Booking.create({
        name , email , phone , event:id, user:userid  ,isbooked:true
    })

    res.status(201).json({
        success:true,
        message: `Event Booked Successfully for ${name}`,
        booking,
    })


})







