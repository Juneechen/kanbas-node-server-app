import quizAttemptModel from "./model.js";

// CRUD operations for quiz attempts
// atempt is always tied to a quiz and the user in the session;
// if no user is in the session, signal an error)

export const createAttempt = (attempt) => quizAttemptModel.create(attempt);
export const findAttemptsForQuizByUser = (quizId, userId) =>
  quizAttemptModel.find({ quizId: quizId, userId: userId });

// export const findAttemptsForQuiz = (quizId) =>
//   quizAttemptModel.find({ quizId: quizId });

// export const findAttemptsForUser = (userId) =>
//   quizAttemptModel.find({ userId: userId });

export const findAttemptById = (attemptId) =>
  quizAttemptModel.findById(attemptId);

// export const updateAttempt = (attemptId, attempt) =>
//   quizAttemptModel.updateOne({ _id: attemptId }, { $set: attempt });

export const deleteAttempt = (attemptId) =>
  quizAttemptModel.deleteOne({ _id: attemptId });

export const adjustScore = (attemptId, newScore) =>
  quizAttemptModel.updateOne({ _id: attemptId }, { $set: { score: newScore } });
