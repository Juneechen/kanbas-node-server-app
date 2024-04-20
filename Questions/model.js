import mongoose from "mongoose";
import questionSchema from "./schema.js";

const questionModel = mongoose.model("Questions", questionSchema);
export default questionModel;
