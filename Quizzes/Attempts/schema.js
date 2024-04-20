import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quizzes", // Reference to the Quiz model
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // map of question _id and the user's answer
    answers: {
      type: Map,
      of: [String], // the user's answer
    },
    // score for the attempt
    score: Number, // TODO: make into computed field
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
