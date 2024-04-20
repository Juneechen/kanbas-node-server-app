import mongoose from "mongoose";
import quizAttemptSchema from "./schema";
const quizAttemptModel = mongoose.model("QuizAttempts", quizAttemptSchema);
export default quizAttemptModel;
