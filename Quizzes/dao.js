import quizModel from "./model.js";

// quizzes CRUD
export const findAllQuizzes = () => quizModel.find();
export const findQuizById = (qid) => quizModel.findOne({ _id: qid });
export const createQuiz = (cid, quiz) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (!quiz.dueDate) {
    quiz.dueDate = today;
  }
  if (!quiz.availableDate) {
    quiz.availableDate = new Date();
  }
  if (!quiz.untilDate) {
    today.setDate(today.getDate() + 1);
    quiz.untilDate = today;
  }

  console.log(quiz);
  delete quiz._id;
  return quizModel.create({ ...quiz, courseId: cid });
};
export const updateQuiz = (id, quiz) =>
  quizModel.updateOne({ _id: id }, { $set: quiz }); // returns a promise that resolves to the number of records updated
export const deleteQuiz = (id) => quizModel.deleteOne({ _id: id });
export const findQuizzesByCourseId = (cid) => quizModel.find({ courseId: cid });

// questions CRUD:
export const createQuestion = async (quizId, question) => {
  delete question._id;
  try {
    const q = await quizModel.findOne({ _id: quizId });
    q.questions.push(question);
    await q.save(); // save the updated quiz
    const res = await quizModel.updateOne({ _id: quizId }, { $set: q });
    const updatedQuiz = await quizModel.findOne({ _id: quizId });
    const addedQuestion = updatedQuiz.questions[updatedQuiz.totalQuestions - 1];
    return addedQuestion;
  } catch (error) {
    console.log(error);
  }
  // return the question object with an _id
};

export const findQuestionById = async (quizID, questionId) => {
  const quiz = await quizModel.findOne({ _id: quizID });
  console.log("dao.findQuestionById, quiz.questions:", quiz.questions);
  // print each question._id to the console
  quiz.questions.forEach((qt) => console.log(qt._id.toString()));
  // print target questionId
  console.log("dao.findQuestionById, target questionId:", questionId);
  const target = quiz.questions.find((qt) => qt._id.toString() === questionId);
  console.log("dao.findQuestionById, target:", target);
  return quiz.questions.find((qt) => qt._id.toString() === questionId);
  // if not found, return undefined
};

export const findQuestionsByQuiz = async (quizId) => {
  const quiz = await quizModel.findOne({ _id: quizId });
  return quiz.questions;
};

export const updateQuestion = async (quizId, questionId, question) => {
  const quiz = await quizModel.findOne({ _id: quizId });
  const index = quiz.questions.findIndex(
    (qt) => qt._id.toString() === questionId
  );
  quiz.questions[index] = question;
  // returns a promise that resolves to the number of records updated
  return quizModel.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuestion = async (quizId, questionId) => {
  const quiz = await findQuizById(quizId);
  const updatedQuestions = quiz.questions.filter(
    (qt) => qt._id.toString() !== questionId
  );
  quiz.questions = updatedQuestions;
  return quizModel.updateOne({ _id: quizId }, { $set: quiz });
  // returns a promise that resolves to the number of records deleted
};

// // get the total points of a quiz, which is the sum of all points of questions referencing the quizId
// export const getTotalPoints = async (qid) => {
//   const questions = await questionModel.find({ quizId: qid });
//   if (!questions) {
//     return 0;
//   }
//   return questions.reduce((total, question) => total + question.points, 0);
//   // return type: number
// };

// // get the total number of questions in a quiz
// export const getTotalQuestions = async (qid) => {
//   const questions = await questionModel.find({ quizId: qid });
//   if (!questions) {
//     return 0;
//   }
//   return questions.length;
// };
