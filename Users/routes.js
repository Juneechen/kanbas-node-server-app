import * as dao from "./dao.js";

let updatedUser = null; // global server variable to store the current user

export default function UserRoutes(app) {
  const register = async (req, res) => {
    const duplicate = await dao.findUserByUsername(req.body.username);
    if (duplicate) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const newUser = await dao.createUser(req.body); // req.body is the user object
    req.session["currentUser"] = newUser; // update the session object
    res.json(newUser);
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.deleteUser(userId); // status is the number of records deleted
    res.send(status);
  };

  const findAllUsers = async (req, res) => {
    // only allow ADMIN to view all users
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "ADMIN") {
      res.status(401).send("Unauthorized");
      return;
    }
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    // console.log("updating user", userId, req.body);
    const status = await dao.updateUser(userId, req.body); // status is the number of records updated
    updatedUser = await dao.findUserById(userId);
    // console.log("updated user", updatedUser);
    req.session["currentUser"] = updatedUser; // update the session object
    res.json(status);
  };

  const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("signing in as", username, password);
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).send("Invalid username or password.");
    }
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.status(200).send("Logged out.");
  };

  const profile = async (req, res) => {
    // res.json(currentUser); // server variable
    if (req.session["currentUser"]) {
      res.json(req.session["currentUser"]); // session variable
    } else {
      res.status(401).send("Not logged in.");
    }
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users/profile", profile); // get from currentUser; use post so route does not coliide with get /api/users/:userId
  app.put("/api/users/:userId", updateUser); // with a user object in the body
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/register", register);
  app.post("/api/users/login", login); // login with username and password
  app.post("/api/users/logout", logout);
}
