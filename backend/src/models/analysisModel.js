import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    problem: {
      type: String,
      trim: true,
    },
    before: {
      type: String,
      trim: true,
    },
    after: {
      type: String,
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const scoreBreakdownSchema = new mongoose.Schema(
  {
    technicalSkills: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    projectRelevance: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    experienceRelevance: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    achievements: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    formatAndATS: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  { _id: false },
);

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
      required: true,
      index: true,
    },
    companyName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    atsScore: { type: Number, required: true, min: 0, max: 100 },
    impactScore: { type: Number, default: 0, min: 0, max: 100 },
    credibilityScore: { type: Number, default: 0, min: 0, max: 100 },
    shortlistChance: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    strengths: [{ type: String, trim: true }],
    weaknesses: [{ type: String, trim: true }],
    matchedSkills: [{ type: String, trim: true }],
    missingSkills: [{ type: String, trim: true }],
    importantKeywordsFound: [{ type: String, trim: true }],
    missingKeywords: [{ type: String, trim: true }],
    redFlags: [{ type: String, trim: true }],
    recruiterSummary: { type: String, trim: true },
    scoreBreakdown: scoreBreakdownSchema,
    suggestions: [suggestionSchema],
    aiProvider: { type: String, enum: ["openai", "gemini"], default: "openai" },
    modelUsed: { type: String, default: "gpt-4o-mini" },
    responseTimeMs: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
