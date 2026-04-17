import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  companyName:{type:String,required:true},
  role:{type:String,required:true},
  score: { type: Number, required: true },
  atsScore: { type: Number, required: true },
  keywords: [{ type: String }],
  format: { type: Number, required: true },
  content: { type: Number, required: true },
  matchedSkills: [{ type: String }],
  missingSkills: [{ type: String }],
  suggestions: [
    {
      category: { type: String },
      before: { type: String },
      after: { type: String },
      reason: { type: String },
    },
  ],
}, {
  timestamps: true,
});

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;