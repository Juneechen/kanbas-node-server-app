// const express = require("express");
import express from "express"; // ES6 syntax; to create the server
import cors from "cors"; // to configure cross-origin resource sharing
import session from "express-session"; // manage session
import "dotenv/config"; // to read the .env file
import mongoose from "mongoose";

// the components that need to interact with the server
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import UserRoutes from "./Users/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import QuizRoutes from "./Quizzes/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING; // get the database URL from the environment variable

try {
  await mongoose.connect(CONNECTION_STRING, {
    dbName: "kanbas",
  });
} catch (error) {
  console.error("Error connecting to MongoDB", error);
}

const app = express(); //
// order matters! the order of the middleware is important, use cors right after app=express() and before other middleware
app.use(
  cors({
    credentials: true, // allow cookies to be sent from the front end to the back end
    origin: [process.env.FRONTEND_URL, process.env.A5_FRONTEND_URL], // the frontend URL that is allowed to access the server; use different front end URL in dev and in production
  })
); // for every request, apply this cors policy; this needs to be done before things below: app.use(express.json()), etc.

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false, // only save the session if a property has been added or modified
  saveUninitialized: false, // only save the session if a property has been added
};

// use different session options in dev and production
// if the server is not in development mode, then set the session cookie to be secure and sameSite=None
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true; // trust the first proxy server
  sessionOptions.cookie = {
    sameSite: "none", // allow the cookie to be sent to a different domain
    secure: true, // only send the cookie over HTTPS
  };
}

app.use(session(sessionOptions));

// app.use(
//   // adds to the request object a session object that is managed by the express-session middleware:
//   // intercepts every request, check if there is a session cookie, and if so, retrieve the session object from the session store
//   session({
//     secret: "sashimi", // secret key to sign the session ID cookie, so that it is not tampered with
//     // secret: process.env.SESSION_SECRET, // secret is normally stored in a .env file
//   })
// );

// for every request, try parse the req.body as JSON
app.use(express.json());

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);

// get process.env.PORT from the environment variable, or use 4000
app.listen(process.env.PORT || 4000);
