import db from "../Database/index.js";

function ModuleRoutes(app) {
  // modules need to be interpreted in the context of a specific course;
  // hierarchy embedded in the URL

  // get all modules
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules.filter((m) => m.course === cid);
    res.send(modules);
  });

  // create a new module
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };

    // db.modules.push(newModule); // add to the database at the end
    db.modules = [newModule, ...db.modules]; // add to the database at the beginning
    res.send(newModule);
  });

  // with a known module id, do not need to specify the course id anymore
  // delete a module by primary key module _id
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  // update a module by given mid as parameter and JSON object as body
  // same endpoint as delete, but different method, no conflict
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex], // keep the old properties, some may not be included in the req.body?
      ...req.body, // update object
    };
    res.sendStatus(204);
  });
}

export default ModuleRoutes;
