const Course = require("../models/Course")
const Module = require("../models/Module")
const Quiz = require("../models/Quiz")


// @desc Create a new quiz
// @route POST /api/quiz/create
// @access Protected (educator only)
exports.createQuiz = async (req, res) => {
    try{
        const educatorId = req.user.id || req.user._id;
        if (!educatorId) {
            return res.status(403).json({ message: "Unauthorized: Educator ID not found" });
        }
        const quizData = {
            ...req.body,
            createdBy: educatorId,
        };
        const newQuiz = await Quiz.create(quizData);
        res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
    }catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Update an existing quiz
// @route PUT /api/quiz/update/:id
exports.updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id || req.user._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User ID not found" });
        }
        const quizData = {
            ...req.body,
            updatedBy: userId,
        };
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, quizData, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Delete a quiz
// @route DELETE /api/quiz/delete/:id
exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id || req.user._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User ID not found" });
        }
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Get quiz by ID
// @route GET /api/quiz/:id
exports.getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id)
            .populate("course", "title description");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz retrieved successfully", quiz });
    } catch (error) {
        console.error("Error retrieving quiz:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Get all quizzes for a course
// @route GET /api/quiz/course/:courseId
exports.getQuizzesByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const quizzes = await Quiz.find({ course: courseId })
            .populate("course", "title description");
        res.status(200).json({ message: "Quizzes retrieved successfully", quizzes });
    } catch (error) {
        console.error("Error retrieving quizzes:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
