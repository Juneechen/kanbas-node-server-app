import userModel from "./model.js";

export const createUser = (user) => {
  delete user._id; // remove _id field just in case client sends it database will create _id for us instead
  return userModel.create(user); // returns a promise that resolves to the created document
};

export const findAllUsers = () => userModel.find(); // find all documents in the collection
export const findUserById = (userId) => userModel.findById(userId);
export const findUserByUsername = (username) =>
  userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  userModel.findOne({ username, password });
export const findUsersByRole = (role) => userModel.find({ role: role });
export const updateUser = (userId, user) =>
  userModel.updateOne({ _id: userId }, { $set: user }); // $set is a MongoDB operator; updateOne returns a promise that resolves to the number of records updated
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId }); // returns a promise that resolves to the number of records deleted
