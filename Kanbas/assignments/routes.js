import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // get all assignments for a specific course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  // get one assignment by assignment id
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = db.assignments.find((a) => a._id === id);
    if (!assignment) {
      //   res.status(404).send("Assignment with this id not found.");
      res.send(null); // for new assignment
    } else {
      res.send(assignment);
    }
  });

  // post a new assignment, body should be JSON object containing assignment data
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(assignment); // push() is a method from the array object
    res.send(assignment); // send back the assignment that was added
  });

  // delete an assignment by primary key id
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== id);
    res.sendStatus(204); // 204: successfully processes the request, no content returned
  });

  // update an assignment by given id as parameter and JSON object as body
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    const index = db.assignments.findIndex((a) => a._id === id);
    if (index === -1) {
      res.status(404).send("Assignment with this id not found.");
    } else {
      console.log("req.body", req.body);
      db.assignments[index] = { ...db.assignments[index], ...req.body };
      console.log("db.assignments[index]", db.assignments[index]);
      // res.send(db.assignments[index]);
      res.sendStatus(204);
    }
  });
} // end of AssignmentRoutes function
