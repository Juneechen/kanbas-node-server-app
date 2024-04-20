import courseModel from "./model.js";
// CRUD
export const findAllCourses = () => courseModel.find();
export const findCourseById = (cid) => courseModel.findOne({ id: cid });
export const findCoursesByDepartment = (dept) =>
  courseModel.find({ department: dept });
// export const findCoursesByInstructor = (inst) =>
//   courseModel.find({ instructor: inst }); // ?
export const createCourse = (course) => courseModel.create(course);
export const updateCourse = (id, course) =>
  courseModel.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) => courseModel.deleteOne({ _id: id });

// find courses by user id
export const findCoursesByUserId = (uid) =>
  courseModel.find({ enrolledByUsers: uid });
