import mongoose from "mongoose";
import moduleSchema from "./schema.js";

const moduleModel = mongoose.model("Modules", moduleSchema);
export default moduleModel;
