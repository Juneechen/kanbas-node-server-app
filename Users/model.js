import mongoose from "mongoose";
import userSchema from "./schema.js";

const model = mongoose.model("UserModel", userSchema);
console.log("Collection Name:", model.collection.name);

// check the number of documents in the collection
console.log("Users in model", model.countDocuments());
model
  .findOne({})
  .then((document) => {
    console.log("First document:", document);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

export default model;
