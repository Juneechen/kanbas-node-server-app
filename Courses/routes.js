import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  // find by _id
  const findCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await dao.findCourseById(id);
    if (!course) {
      res.status(404).send("Course with this id not found.");
    } else {
      res.json(course);
    }
  };

  const createCourse = async (req, res) => {
    // since our edit and add uses the same form
    // delete the _id field if it exists
    delete req.body._id;
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  // update by _id
  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const course = await dao.updateCourse(id, req.body);
    res.json(course);
  };

  // delete by _id
  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    res.send(status);
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}