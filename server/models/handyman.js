import mongoose from "mongoose";
import validator from "validator";
import { User } from "./usermodel.js";

const handymanschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    typeofservice:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    fee:{
        type:String,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
        
    },
    isbooked: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default:null,
        validate:{
        validator: async (value) => {
            if(value){
                const booked = await User.findById(value);
                return !!booked
            }
            return true;
        }}
    }

})

handymanschema.pre('save', async function (next) {
    if (this.isModified('isbooked')) {
      const bookedUser = await User.findById(this.isbooked);
      if (bookedUser) {
        return next(new Error('This service is already booked'));
      }
    }
    next();
  });

export const Handyman = mongoose.model("Handyman" , handymanschema);