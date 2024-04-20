import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  const findAllQuestions = async (req, res) => {
    const questions = await dao.findAllQuestions();
    res.json(questions);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    res.json(question);
  };

  const findQuestionsByQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsByQuiz(quizId);
    res.json(questions);
  };

  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const question = await dao.createQuestion(quizId, req.body);
    res.json(question);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.updateQuestion(questionId, req.body);
    res.json(question);
  };

  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    res.send(status);
  };

  app.get("/api/questions", findAllQuestions);
  app.get("/api/questions/:questionId", findQuestionById);
  app.get("/api/quizzes/:quizId/questions", findQuestionsByQuiz);
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
}
