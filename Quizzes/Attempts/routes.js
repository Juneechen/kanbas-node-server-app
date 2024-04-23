import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  const createAttempt = async (req, res) => {
    // attach quizId, userId and score to the attempt
    if (!req.session["currentUser"]) {
      res.status(403).send("Not logged in / session expired");
      return;
    }
    const userId = req.session["currentUser"]._id;
    const { quizId } = req.params;
    const { answers, score } = req.body;
    console.log("createAttempt in route.js, answers:", answers);
    const toAdd = { answers: answers, score: score, quizId: quizId, userId };
    const attempt = await dao.createAttempt(toAdd);
    res.json(attempt);
  };

  const findAttemptsForQuizByUser = async (req, res) => {
    if (!req.session["currentUser"]) {
      res.status(403).send("Not logged in / session expired");
      return;
    }
    const userId = req.session["currentUser"]._id;
    const { quizId } = req.params;
    const attempts = await dao.findAttemptsForQuizByUser(quizId, userId);
    res.json(attempts);
  };

  const findAttemptById = async (req, res) => {
    const { aid } = req.params;
    const attempt = await dao.findAttemptById(aid);
    res.json(attempt);
  };

  const deleteAttempt = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAttempt(aid);
    res.send(status);
  };

  const adjustScore = async (req, res) => {
    const { aid } = req.params;
    const { newScore } = req.body;
    const status = await dao.adjustScore(aid, newScore);
    res.send(status);
  };

  app.post("/api/quizzes/:quizId/attempts", createAttempt);
  app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuizByUser);
  app.get("/api/attempts/:aid", findAttemptById);
  app.delete("/api/attempts/:aid", deleteAttempt);
  app.put("/api/attempts/:aid/score", adjustScore);
}
