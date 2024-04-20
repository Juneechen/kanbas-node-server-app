import questionModel from "./model.js";

export const createQuestion = (quizId, question) => {
  delete question._id;
  question.quizId = quizId;
  return questionModel.create(question);
};

export const findAllQuestions = () => questionModel.find();

export const findQuestionById = (questionId) =>
  questionModel.findById(questionId);

export const findQuestionsByQuiz = (quizId) =>
  questionModel.find({ quizId: quizId });

export const updateQuestion = (questionId, question) =>
  questionModel.updateOne({ _id: questionId }, { $set: question });

export const deleteQuestion = (questionId) =>
  questionModel.deleteOne({ _id: questionId }); // returns a promise that resolves to the number of records deleted
