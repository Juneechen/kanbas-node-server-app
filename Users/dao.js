import model from "./model.js";

export const createUser = (user) => {
  delete user._id; // remove _id field just in case client sends it database will create _id for us instead
  return model.create(user); // returns a promise that resolves to the created document
};

export const findAllUsers = () => model.find(); // find all documents in the collection
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const findUsersByRole = (role) => model.find({ role: role });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user }); // $set is a MongoDB operator; updateOne returns a promise that resolves to the number of records updated
export const deleteUser = (userId) => model.deleteOne({ _id: userId }); // returns a promise that resolves to the number of records deleted
