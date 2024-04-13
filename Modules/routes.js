import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.fetchModules(cid);
    res.send(modules);
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const module = req.body;
    try {
      const newModule = await dao.createModule(cid, module);
      res.send(newModule);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    await dao.deleteModule(mid);
    res.sendStatus(200);
  });

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const status = await dao.updateModule(mid, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}
