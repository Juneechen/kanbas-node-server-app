import moduleModel from "./model.js";

export const fetchModules = (cid) => moduleModel.find({ course: cid });

export const createModule = (cid, new_module) => {
  delete new_module._id;
  return moduleModel.create({ ...new_module, course: cid });
};

export const deleteModule = (id) => moduleModel.deleteOne({ _id: id });

export const updateModule = (id, modified_module) => {
  return moduleModel.updateOne({ _id: id }, { $set: modified_module });
};
