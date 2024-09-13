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

// export const bookhandymanservice = catchasyncerror(async(req,res,next) => {
//     const {id}  =req.params;
//     const handymanservice = await Handyman.findById(id);
//     const userid = req.user._id;

//     if(!handymanservice){
//         return next(new ErrorHandler("This service is not available",400));
//     }
//     if (handymanservice.isbooked!==userid) {
//         return next(new ErrorHandler("Already Booked Service", 400));
//     }
//     handymanservice.isbooked = userid;
//     await handymanservice.save();

//     res.status(200).json({
//         success:true,
//         message:"Successfully Booked"
//     })
// })



export const bookhandymanservice = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; // Extract user ID from request

  const handymanService = await Handyman.findById(id); // Populate postedBy

  if (!handymanService) {
    return next(new ErrorHandler("This service is not available", 400));
  }

  if (handymanService.isbooked && handymanService.isbooked.toString() !== userId) {
    return next(new ErrorHandler("Already Booked Service", 400));
  }

  handymanService.isbooked = userId;
  await handymanService.save();

  res.status(200).json({
    success: true,
    message: "Successfully Booked",
    handyman: handymanService, // Include booked handyman details (optional)
  });
});

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

export const deleteservice = catchasyncerror(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params);
    const service = await Handyman.findById(id);
    
    if (!service) {
        return next(new ErrorHandler("😅 Oops, This Service is not available anymore", 400));
    }
    
    await service.deleteOne();
    res.status(200).json({
        success: true,
        message: "Deleted Successfully",
    });
});

export const updateservice = catchasyncerror(async(req,res,next) => {
    const updateservice = {
        name: req.body.name,
        fee: req.body.fee,
        typeofservice: req.body.typeofservice,
        phone: req.body.phone,
        address: req.body.address
    }

    const handyservice = await Handyman.findByIdAndUpdate(req.params.id , updateservice , {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(201).json({
        success:true,
        message:"Updated Successfully",
        handyservice
    })
})

export const fetchdetails = catchasyncerror(async(req,res,next) => {
    const {id} = req.params;
    const fetchhandyman = await Handyman.findById(id);
    if(!fetchdetails){
        return next(new ErrorHandler("😅 Oops, This Service is not available anymore", 400));
    }

    res.status(201).json({
        success:true,
        fetchhandyman
    })
     
})



