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
    q.questions.push(question); // fields will be filled with default values defined in schema
    await q.save(); // save the updated quiz in the database
    // const res = await quizModel.updateOne({ _id: quizId }, { $set: q });
    // const updatedQuiz = await quizModel.findOne({ _id: quizId });
    const addedQuestion = q.questions[q.questions.length - 1];
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
  if (question.type === "TF") {
    question.options = ["True", "False"];
  }
  quiz.questions[index] = question;
  // returns a promise that resolves to the number of records updated
  return quizModel.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuestion = async (quizId, questionId) => {
  console.log("quizId in dao.deleteQuestion:", quizId);
  console.log("questionId in dao.deleteQuestion:", questionId);
  const quiz = await findQuizById(quizId);
  console.log("quiz in dao.deleteQuestion:", quiz);
  const updatedQuestions = quiz.questions.filter(
    (qt) => qt._id.toString() !== questionId
  );
  quiz.questions = updatedQuestions;
  return quizModel.updateOne({ _id: quizId }, { $set: quiz });
  // returns a promise that resolves to the number of records deleted
};
