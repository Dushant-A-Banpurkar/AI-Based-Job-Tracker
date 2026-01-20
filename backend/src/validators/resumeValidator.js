import mongoose from "mongoose";
import z from "zod";

const isObjectId=(val)=>mongoose.isValidObjectId(val);

export const resumeSchema=new z.object({
    userId:z.string().min(1,"userId Required").refine(isObjectId,{
        message:"Invalid userId"
    }),
    jobDescription:z.string().max(10000,"Job Description Required").optional().or(z.literal("")),
    pdfTextData:z.string().optional()
});

// I need to add this valdition in resume controller