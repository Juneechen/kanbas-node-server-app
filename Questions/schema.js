import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // reference to the id of a quiz
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quizzes",
      required: true,
    },
    // question types: True/false, Multiple choice question, Fill in multiple blanks
    type: {
      type: String,
      enum: ["TF", "MC", "FillInMultipleBlanks"],
      required: true,
      default: "MC",
    },
    title: { type: String, required: true, default: "Question" },
    prompt: { type: String, required: true, default: "Prompt" },
    points: { type: Number, required: true, default: 1 },
    // optoions and correct answer for each type
    TF_Options: ["True", "False"],
    MC_Options: { type: [String], default: [] },
    correctAnswers: { type: [String], default: [] }, // index is blank number
  }
  // { collection: "questions" }
);

export default questionSchema;
