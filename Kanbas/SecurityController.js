export default function SecurotyController(app) {
  // set a session variable
  app.get("/api/session/set/:key/:value", (req, res) => {
    const { key, value } = req.params;
    req.session[key] = value; // this session is unique to the user, based on the session cookie parsed by express-session from the request
    res.send(`session set with ${key}:${value}`);
  });
}
