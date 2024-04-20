import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: String,
    // dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN"],
      default: "STUDENT",
    },

    // a list of courses the user is enrolled in
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
    // // a map of Quiz _id to a list of QuizAttempt _id that the user has attempted
    // quizAttempts: {
    //   type: Map,
    //   of: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizAttempts" }],
    // },
  },
  { collection: "users" } // store data in "users" collection in MongoDB
);

export default userSchema;
