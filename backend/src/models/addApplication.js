import mongoose from "mongoose";
import { optional, trim } from "zod";

const model=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserData",
        required:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        trim:true
    },
    applied_date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    interview_date:{
        type:String,
        required:true,
        trim:true
    },
    notes:{
        type:String,
        trim:true,
        optional
    }
},{timestamps:true});

const AddApplicationData=mongoose.model("Application-Data",model);
export default AddApplicationData;