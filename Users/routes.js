import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";

let updatedUser = null; // global server variable to store the current user

export default function UserRoutes(app) {
  const register = async (req, res) => {
    const duplicate = await dao.findUserByUsername(req.body.username);
    if (duplicate) {
      res.status(400).json({ message: "Username already taken." });
      return;
    }
    try {
      const newUser = await dao.createUser(req.body); // req.body is the user object

      // enroll the user in a default course with ObjectId("660e0aa6e7704d1f27e97f37")
      const defaultCourseId = "660e0aa6e7704d1f27e97f37";
      await dao.addEnrolledCourse(newUser._id, defaultCourseId);
      await courseDao.addEnrolledUser("660e0aa6e7704d1f27e97f37", newUser._id);
      const updatedUser = await dao.findUserById(newUser._id);

      // if logged in as ADMIN and adding new user, do not update the session object
      if (!req.session["currentUser"]) {
        req.session["currentUser"] = updatedUser; // update the session object
      }
      res.json(updatedUser);
    } catch (error) {
      // e.g., if the user object is missing a required field
      console.error("error at register:", error.message);
      res.status(400).json({ message: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.deleteUser(userId); // status is the number of records deleted
    res.send(status);
  };

  const findAllUsers = async (req, res) => {
    console.log("users routes findAllUsers");
    // only allow ADMIN to view all users
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "ADMIN") {
      res.status(401).send("Unauthorized.");
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
    const user = await dao.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    try {
      const status = await dao.updateUser(userId, req.body); // status is the number of records updated
      console.log("status", status);
      // if updating other user, do not update the session object
      if (userId === req.session["currentUser"]._id) {
        req.session["currentUser"] = await dao.findUserById(userId);
      }
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
