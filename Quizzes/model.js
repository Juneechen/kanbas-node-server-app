import mongoose from "mongoose";
import quizSchema from "./schema.js";

const quizModel = mongoose.model("Quizzes", quizSchema);
export default quizModel;
