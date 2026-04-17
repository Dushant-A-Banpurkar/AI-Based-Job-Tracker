import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Users",
      required: true,
    },
    companyName:{
      type:String,
      trim:true,
      maxLength:100,
    },
    role:{
      type:String,
      trim:true,
    },
    jobDescription: {
      type: String,
      trim: true,
      maxLength: 10000,
    },
    pdfTextData: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const resumeData=mongoose.model("Resume Data",resumeSchema);

export default resumeData;
