import { openai } from "../config/openai.js";
import resumeData from "../models/resumeModel.js";
import * as dotenv from "dotenv";
import Analysis from "../models/analysisModel.js";
dotenv.config();
import UserData from "../models/userModel.js";

export const createAnalysis = async (req, res) => {
  try {
    const { userId } = req.params;
    const userResumeData = await resumeData.findOne({ userId });
    if (!userResumeData) {
      return res.status(404).json({ error: "Resume data not found" });
    }
    const { companyName, role, jobDescription, pdfTextData } = userResumeData;

    const prompt = `
You are an advanced ATS (Applicant Tracking System), technical recruiter, and hiring manager.

Your task is to evaluate the candidate's resume against the provided job description exactly like a real recruiter shortlisting candidates for interviews.

Analyze:
- ATS compatibility
- keyword relevance
- technical skill match
- project relevance
- measurable achievements
- formatting/readability
- recruiter impression
- role alignment
- missing requirements
- resume credibility

Be strict and realistic.
Do NOT inflate scores.
A candidate missing important requirements should receive a lower score.

========================
COMPANY NAME
========================
${companyName}

========================
ROLE
========================
${role}

========================
JOB DESCRIPTION
========================
${jobDescription}

========================
RESUME
========================
${pdfTextData}

========================
SCORING RULES
========================

Overall Score (0-100):
- 90-100 = Excellent match, highly likely shortlist
- 75-89 = Strong candidate
- 60-74 = Moderate match
- 40-59 = Weak match
- Below 40 = Poor match

ATS Score:
Evaluate:
- keyword optimization
- parsing compatibility
- section clarity
- resume structure

Impact Score:
Evaluate:
- measurable achievements
- business impact
- quantified metrics

Credibility Score:
Evaluate:
- authenticity
- realistic claims
- consistency
- depth of projects/experience

========================
IMPORTANT RULES
========================

- Return ONLY valid JSON
- Do NOT return markdown
- Do NOT include explanations outside JSON
- Keep suggestions practical and recruiter-focused
- If resume lacks measurable achievements, mention it
- If projects are weak or irrelevant, mention it
- If resume appears keyword stuffed, mention it
- Suggestions should improve shortlist probability

========================
RETURN JSON FORMAT
========================

{
  "companyName": "string",
  "role": "string",

  "overallScore": 0,
  "atsScore": 0,
  "impactScore": 0,
  "credibilityScore": 0,

  "shortlistChance": "High | Medium | Low",

  "strengths": [
    "string"
  ],

  "weaknesses": [
    "string"
  ],

  "matchedSkills": [
    "string"
  ],

  "missingSkills": [
    "string"
  ],

  "importantKeywordsFound": [
    "string"
  ],

  "missingKeywords": [
    "string"
  ],

  "redFlags": [
    "string"
  ],

  "recruiterSummary": "2-4 sentence realistic recruiter evaluation",

  "scoreBreakdown": {
    "technicalSkills": 0,
    "projectRelevance": 0,
    "experienceRelevance": 0,
    "achievements": 0,
    "formatAndATS": 0
  },

  "suggestions": [
    {
      "category": "string",
      "problem": "string",
      "before": "string",
      "after": "string",
      "reason": "string"
    }
  ]
}
`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      response_format: { type: "json_object" },

    });
    const analysisResult = JSON.parse(
      chatCompletion.choices[0].message.content,
    );
    const savedAnalysis = await Analysis.findOneAndUpdate(
      {
        userId,
        companyName: analysisResult.companyName,
        role: analysisResult.role,
      },
      {
        $set: {
          userId,

          companyName: analysisResult.companyName,
          role: analysisResult.role,

          overallScore: analysisResult.overallScore,
          atsScore: analysisResult.atsScore,
          impactScore: analysisResult.impactScore,
          credibilityScore: analysisResult.credibilityScore,

          shortlistChance: analysisResult.shortlistChance,

          strengths: analysisResult.strengths || [],
          weaknesses: analysisResult.weaknesses || [],

          matchedSkills: analysisResult.matchedSkills || [],
          missingSkills: analysisResult.missingSkills || [],

          importantKeywordsFound: analysisResult.importantKeywordsFound || [],

          missingKeywords: analysisResult.missingKeywords || [],

          redFlags: analysisResult.redFlags || [],

          recruiterSummary: analysisResult.recruiterSummary || "",

          scoreBreakdown: {
            technicalSkills:
              analysisResult.scoreBreakdown?.technicalSkills || 0,

            projectRelevance:
              analysisResult.scoreBreakdown?.projectRelevance || 0,

            experienceRelevance:
              analysisResult.scoreBreakdown?.experienceRelevance || 0,

            achievements: analysisResult.scoreBreakdown?.achievements || 0,

            formatAndATS: analysisResult.scoreBreakdown?.formatAndATS || 0,
          },

          suggestions: analysisResult.suggestions || [],

          aiProvider: analysisResult.aiProvider,

          modelUsed: analysisResult.modelUsed,

          responseTimeMs: analysisResult.responseTimeMs,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );
    if(!savedAnalysis){
      throw Error("Problem in savedAnalysis")
      console.log(message.error)
    }
    console.log("analysis Result: ", savedAnalysis);
    res.status(200).json({ Message: "Analysis complete", data: savedAnalysis });
  } catch (error) {
    console.error("Error in analysis:", error);
    res
      .status(500)
      .json({ error: "Failed to perform Analysis", details: error.message });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const analysisResult = await Analysis.findById(id);
    if(!analysisResult){
      return res.status(404).json({error:"Analysis History Not Found"})
    }
    return res
      .status(200)
      .json({ message: "Get Analysis Result", data: { analysisResult } });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


export const fetchAnalysisHistory=async (req,res) => {
  try {
    const {userId}=req.body;
    const id=await UserData.findById(userId);
    if(!id){
      console.log("UserId not Found");
      return res.status(400).json({message:"User Not Found!!!"});
    }

    const fetchHistory=(await Analysis.find({userId:userId}))

    if(!fetchHistory || !fetchHistory.length ===0){
      return res.status(404).json({message:"No History Data Found"})
    }
    res.status(200).json(fetchHistory)
  } catch (error) {
    console.log("Error: ",error);
    res.status(500).json({error:"Server Error:",details:error.message})
  }
}