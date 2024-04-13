import mongoose from "mongoose";
import userSchema from "./schema.js";

const userModel = mongoose.model("Users", userSchema);
export default userModel;
