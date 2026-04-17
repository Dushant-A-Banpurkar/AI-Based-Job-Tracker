import { openai } from "../config/openai.js";
import resumeData from "../models/resumeModel.js";
import * as dotenv from "dotenv";
import Analysis from "../models/analysisModel.js";
dotenv.config();

export const createAnalysis = async (req, res) => {
  try {
    const { userId } = req.params;
    const userResumeData = await resumeData.findOne({ userId });
    if (!userResumeData) {
      return res.status(404).json({ error: "Resume data not found" });
    }
    const { companyName, role, jobDescription, pdfTextData } = userResumeData;

    const prompt = `
      Act as an expert ATS (Application Tracking System) and Resume Coach.
      Analyze the following resume against the job description.

      Company Name:
      ${companyName}

      Role:
      ${role}

      Job Description:
      ${jobDescription}

      Resume Text:
      ${pdfTextData}

      Return a JSON object strictly following this structure. Do not return markdown or explanations, only the JSON:
      { 
        "comanyName:(name of Company),
        "role":(role or position),
        "score": (number 0-100, overall match),
        "atsScore": (number 0-100, technical parsing capability),
        "keywords": ["List", "of", "important", "keywords", "found"], 
        "format": (number 0-100, structure and readability),
        "content": (number 0-100, impact and clarity),
        "matchedSkills": ["skill1", "skill2"],
        "missingSkills": ["skill1", "skill2"],
        "suggestions": [
          {
            "category": "Section Name (e.g., Work Experience)",
            "before": "Original text from resume",
            "after": "Improved version",
            "reason": "Why this change improves the resume"
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
      { userId: userId },
      {
        userId: userId,
        companyName: analysisResult.companyName,
        role: analysisResult.role,
        score: analysisResult.score,
        atsScore: analysisResult.atsScore,
        keywords: analysisResult.keywords,
        format: analysisResult.format,
        content: analysisResult.content,
        matchedSkills: analysisResult.matchedSkills,
        missingSkills: analysisResult.missingSkills,
        suggestions: analysisResult.suggestions,
      },
      {
        new: true,
        upsert: true,
      },
    );
    // console.log("analysis Result: ", savedAnalysis);
    res.status(200).json({ Message: "Analysis complete", data: savedAnalysis });
  } catch (error) {
    console.error("Error in analysis", error);
    res
      .status(500)
      .json({ error: "Failed to perform Analysis", details: error.message });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await Analysis.findById(userId);
    res
      .status(200)
      .json({ message: "Get Analysis Result", data: { userData } });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
