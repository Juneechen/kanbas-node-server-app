import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // reference to the id of a quiz
    // quizId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Quizzes",
    //   required: true,
    // },
    // question types: True/false, Multiple choice question, Fill in multiple blanks
    type: {
      type: String,
      enum: ["TF", "MC", "FillInMultipleBlanks"],
      required: true,
      default: "MC",
    },
    title: { type: String, required: true, default: "Question" },
    prompt: { type: String, required: true, default: "Prompt" },
    points: { type: Number, required: true, default: 1 },
    // optoions and correct answer for each type
    options: { type: [String], default: [] },
    TF_Options: { type: [String], default: ["True", "False"] },
    correctAnswer: { type: String, required: true, default: " " },
  }
  // { collection: "questions" }
);

const quizSchema = new mongoose.Schema(
  {
    // reference to the id of a course
    courseId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "Courses",
      required: true,
    },
    // quiz properties:
    title: { type: String, required: true, default: "Quiz" },
    isPublished: { type: Boolean, required: true, default: false },
    description: { type: String, default: "" }, // not shown on Details page
    type: {
      type: String,
      enum: ["GRADED", "PRACTICE", "SURVEY"],
      default: "GRADED",
    },
    // points: { type: Number, required: true },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECTS"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, required: true, default: Date.now() }, // persision to the minute
    availableDate: { type: Date, required: true, default: Date.now() },
    untilDate: { type: Date, required: true, default: Date.now() },

    // // a list of questions
    questions: { type: [questionSchema], default: [] },
  },
  { collection: "quizzes" }
);

// // Define a virtual property to calculate the sum of points
// quizSchema.virtual("totalPoints").get(function () {
//   return this.questions.reduce(
//     (total, question) => total + (question.points || 0),
//     0
//   );
// });

function calculateTotalQuestions() {
  if (!this.questions) {
    return 0;
  }
  return this.questions.length;
}

function calculateTotalPoints() {
  if (!this.questions) {
    return 0;
  }
  return this.questions.reduce(
    (total, question) => total + (question.points || 0),
    0
  );
}

function getAvailability() {
  // get today's date
  const today = new Date();
  if (today > new Date(this.untilDate)) {
    return "Closed";
  } else if (today < new Date(this.availableDate)) {
    return `Not available until ${getFormatedDate(
      new Date(this.availableDate)
    )}`;
  } else {
    return "Available";
  }
}

quizSchema.virtual("totalPoints").get(calculateTotalPoints);
quizSchema.virtual("totalQuestions").get(calculateTotalQuestions);
quizSchema.virtual("availability").get(getAvailability);

// Apply options to control transformation
quizSchema.set("toObject", { virtuals: true });
quizSchema.set("toJSON", { virtuals: true }); // Include virtual properties when converting to JSON

export default quizSchema;
