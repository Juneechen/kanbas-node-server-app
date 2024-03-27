import db from "../Database/index.js";

export default function UserRoutes(app) {
  // get all users
  app.get("/api/users", (req, res) => {
    res.send(db.users);
  });

  // register new user and set as current user in session
  // implement with get for now for testing purpose, but should be post; fix later
  app.get("/api/users/register/:username/:password", (req, res) => {
    const { username, password } = req.params;
    const user = db.users.find((u) => u.username === username);
    if (user) {
      res.status(401).send("Username already registered.");
    } else {
      const newUser = {
        username,
        password,
        _id: new Date().getTime().toString(),
      };
      db.users.push(newUser); // add to the database
      req.session.user = newUser; // set as current user in session
      res.send(newUser);
    }
  });
  //   // post a new user
  //   app.post("/api/users", (req, res) => {
  //     const user = { ...req.body, _id: new Date().getTime().toString() };
  //     db.users.push(user);
  //     res.send(user);
  //   });

  // get user profile
  app.get("/api/users/profile", (req, res) => {
    const user = req.session.user; // find current user in session
    if (!user) {
      res.status(401).send("Not logged in.");
    } else {
      res.send(user);
    }
  });

  // login user and set as current user in session
  // implement with get for now for testing purpose, but should be post; fix later
  app.get("/api/users/login/:username/:password", (req, res) => {
    const { username, password } = req.params;
    // find user in database
    const user = db.users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      res.status(401).send("Invalid username or password.");
    } else {
      req.session.user = user; // set as current user in session
      res.send(user); // return the user
    }
  });

  // log out user
  app.get("/api/users/logout", (req, res) => {
    // req.session.user = null;
    req.session.destroy(); // remove session from store
    res.send("Logged out.");
  });

  //   // get user by primary key id
  //   app.get("/api/users/:id", (req, res) => {
  //     const users = db.users;
  //     const id = req.params.id;
  //     const user = users.find((u) => u.id === id);
  //     if (!user) {
  //       res.status(404).send("User with this id not found.");
  //     } else {
  //       res.send(user);
  //     }
  //   });
}
