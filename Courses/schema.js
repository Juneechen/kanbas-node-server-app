import mongoose from "mongoose";
const courseSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    number: String,
    // startDate: String,
    // endDate: String,
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);
export default courseSchema;
