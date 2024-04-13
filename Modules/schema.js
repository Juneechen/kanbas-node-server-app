import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    course: String,
    lessons: [
      { id: String, name: String, description: String, module: String },
    ],
  },
  { collection: "modules" }
);

export default moduleSchema;
