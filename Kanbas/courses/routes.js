import Database from "../Database/index.js";

export default function CourseRoutes(app) {
  // get all courses
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  // get course by primary key id
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course with this id not found.");
    } else {
      res.send(course);
    }
  });

  // post a new course, body should be JSON object containing course data
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    // Database.courses.push(course); // push() is a method from the array object
    Database.courses = [course, ...Database.courses]; // add to the database at the beginning
    res.send(course); // send back the course that was added
  });

  // delete a course by primary key id
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204); // 204: successfully processes the request, no content returned
  });

  // update a course by given id as parameter and JSON object as body
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    const index = Database.courses.findIndex((c) => c._id === id);
    if (index === -1) {
      res.status(404).send("Course with this id not found.");
    } else {
      Database.courses[index] = { ...course, _id: id };
      // res.send(Database.courses[index]);
      res.sendStatus(204);
    }
  });
}
