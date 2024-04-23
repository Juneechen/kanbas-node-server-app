import mongoose from "mongoose";
import quizAttemptSchema from "./schema.js";
const quizAttemptModel = mongoose.model("QuizAttempts", quizAttemptSchema);
export default quizAttemptModel;
