import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  };

  const createQuiz = async (req, res) => {
    console.log("createQuiz in routes.js");
    const { cid } = req.params;
    const quiz = await dao.createQuiz(cid, req.body);
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.updateQuiz(qid, req.body);
    res.json(status);
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.send(status);
  };

  const findQuizzesByCourseId = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourseId(cid);
    res.json(quizzes);
  };

  // const getTotalPoints = async (req, res) => {
  //   const { qid } = req.params;
  //   const totalPoints = await dao.getTotalPoints(qid);
  //   res.json(totalPoints);
  // };

  // const getTotalQuestions = async (req, res) => {
  //   const { qid } = req.params;
  //   const totalQuestions = await dao.getTotalQuestions(qid);
  //   res.json(totalQuestions);
  // };

  // questions CRUD:
  const createQuestion = async (req, res) => {
    try {
      const { quizId } = req.params;
      console.log("createQuestion in routes.js; quizId:", quizId);
      const addedQuestion = await dao.createQuestion(quizId, req.body);
      console.log("addedQuestion in routes.createQuestion:", addedQuestion);
      res.json(addedQuestion);
    } catch (error) {
      console.log(error);
    }
  };

  const findQuestionById = async (req, res) => {
    const { quizId, questionId } = req.params;
    console.log("questionId in findQuestionById routes:", questionId);
    const question = await dao.findQuestionById(quizId, questionId);
    res.json(question);
  };

  const findQuestionsByQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsByQuiz(quizId);
    res.json(questions); // an array of questions as json?
  };

  const updateQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.updateQuestion(quizId, questionId, req.body);
    res.json(status);
  };

  const deleteQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.deleteQuestion(quizId, questionId);
    res.send(status);
  };

  // quizzes
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:qid", findQuizById);
  app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  // app.get("/api/quizzes/:qid/totalPoints", getTotalPoints);
  // app.get("/api/quizzes/:qid/totalQuestions", getTotalQuestions);

  // questions
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.get("/api/quizzes/:quizId/questions/:questionId", findQuestionById);
  app.get("/api/quizzes/:quizId/questions", findQuestionsByQuiz);
  app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
}
