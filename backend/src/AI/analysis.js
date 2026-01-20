import qna from "@tensorflow-models/qna"


const model=await qna.load()

const answer=await model.findAnswers(question,answer);

console.log("Answer: ")