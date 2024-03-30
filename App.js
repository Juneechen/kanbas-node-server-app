// const express = require("express");
import express from "express"; // ES6 syntax; to create the server
import session from "express-session"; // manage session
import cors from "cors"; // to configure cross-origin resource sharing

// the components that need to interact with the server
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import UserRoutes from "./Kanbas/users/routes.js";

const app = express(); //
// order matters! the order of the middleware is important
app.use(cors()); // for every request, apply this cors policy; this needs to be done before things below: app.use(express.json()), etc.
app.use(express.json()); // for every request, try parse the req.body as JSON
app.use(
  // adds to the request object a session object that is managed by the express-session middleware:
  // intercepts every request, check if there is a session cookie, and if so, retrieve the session object from the session store
  session({
    secret: "sashimi", // secret key to sign the session ID cookie, so that it is not tampered with
    // secret: process.env.SESSION_SECRET, // secret is normally stored in a .env file
  })
);

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000); // get process.env.PORT from the environment variable, or use 4000
