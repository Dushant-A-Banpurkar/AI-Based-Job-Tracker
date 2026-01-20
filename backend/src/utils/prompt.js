const prompt = `
      Act as an expert ATS (Application Tracking System) and Resume Coach.
      Analyze the following resume against the job description.

      Job Description:
      ${jobDescription}

      Resume Text:
      ${pdfTextData}

      Return a JSON object strictly following this structure. Do not return markdown or explanations, only the JSON:
      {
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
export const chatCompletion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.2,
  response_format: { type: "json_object" },
});
