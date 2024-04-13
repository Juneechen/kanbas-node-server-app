import mongoose from "mongoose";
import courseSchema from "./schema.js";
const courseModel = mongoose.model("Courses", courseSchema);
export default courseModel;
