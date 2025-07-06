const express = require("express");
const quizRouter = express.Router();

const { 
    createQuiz, 
    updateQuiz, 
    deleteQuiz,
    getQuizById,
    getQuizzesByCourse
    } = require("../controllers/quizController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isEducator, isCoordinator } = require("../middleware/roleMiddleware");

// Protected: Create quiz (educator only)
// http://localhost:3000/api/quiz/create
quizRouter.post("/create", verifyToken, isEducator, createQuiz);

// Protected: Update quiz (educator and admin only)
// http://localhost:3000/api/quiz/update/:id
quizRouter.put("/update/:id", verifyToken, isEducator || isCoordinator, updateQuiz);

// Protected: Delete quiz (educator and admin only)
// http://localhost:3000/api/quiz/delete/:id
quizRouter.delete("/delete/:id", verifyToken, isEducator || isCoordinator, deleteQuiz);

// Public: Get all quizzes for a course
// http://localhost:3000/api/quiz/course/:courseId
quizRouter.get("/course/:courseId", getQuizzesByCourse);

// Public: Get quiz by ID
// http://localhost:3000/api/quiz/:id
quizRouter.get("/:id", getQuizById);

// Export the quiz router
module.exports = quizRouter;