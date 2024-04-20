import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    // startDate: String,
    // endDate: String,
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    description: String,

    // a list of user _id who are enrolled in the course
    enrolledByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],

    // // a list of quiz _id that are assigned to the course
    // quizzesForCourse: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "Quizzes" },
    // ],
  },
  { collection: "courses" }
);
export default courseSchema;
