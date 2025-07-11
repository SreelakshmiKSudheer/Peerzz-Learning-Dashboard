const Submission = require("../models/Submissions");
const Assignment = require("../models/Assignments");
const Quiz = require("../models/Quiz");

// Submit an assignment
// http://localhost:3000/api/submission/assignment/:id
exports.submitAssignment = async (req, res) => {
  try {
    const { id } = req.params; // assignment ID
    const { content } = req.body;
    const userId = req.user.id;

    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const existing = await Submission.findOne({
      subtype: "Assignment",
      submittedBy: userId,
      submittedAgainst: id,
    });

    if (existing) return res.status(400).json({ message: "You already submitted this assignment" });

    const submission = await Submission.create({
      subtype: "Assignment",
      submittedAgainst: id,
      submittedBy: userId,
      content,
      submittedAt: new Date(),
    });

    res.status(201).json({ message: "Assignment submitted successfully", submission });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Submit a quiz
// http://localhost:3000/api/submission/quiz/:id
exports.submitQuiz = async (req, res) => {
  try {
    const { id } = req.params; // quiz ID
    const { answers } = req.body;
    const userId = req.user.id;

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const existing = await Submission.findOne({
      subtype: "Quiz",
      submittedBy: userId,
      submittedAgainst: id,
    });

    if (existing) return res.status(400).json({ message: "You already submitted this quiz" });

    const submission = await Submission.create({
      subtype: "Quiz",
      submittedAgainst: id,
      submittedBy: userId,
      content: JSON.stringify(answers),
      submittedAt: new Date(),
    });

    res.status(201).json({ message: "Quiz submitted successfully", submission });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all submissions by user
// http://localhost:3000/api/submission/user/:id
exports.getSubmissionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({ submittedBy: userId })
      .populate("submittedAgainst")
      .populate("submittedBy", "name email");

    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all submissions of the logged-in learner
// http://localhost:3000/api/submission/user/me
exports.getMySubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await Submission.find({ submittedBy: userId })
      .populate("submittedAgainst")
      .populate("submittedBy", "name email");

    res.status(200).json({ message: "Your submissions retrieved", submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single submission by ID
// http://localhost:3000/api/submission/:id
exports.getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId)
      .populate("submittedAgainst")
      .populate("submittedBy", "name email");

    if (!submission) return res.status(404).json({ message: "Submission not found" });

    res.status(200).json({ submission });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all submissions by Assignment ID
// http://localhost:3000/api/submission/assignment/:id
exports.getSubmissionsByAssignmentId = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({
      subtype: "Assignment",
      submittedAgainst: assignmentId
    }).populate("submittedBy", "name email");

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found for this assignment" });
    }

    res.status(200).json({ submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get all submissions for a quiz
// http://localhost:3000/api/submission/quiz/:id
exports.getSubmissionsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    const submissions = await Submission.find({
      subtype: "Quiz",
      submittedAgainst: quizId,
    }).populate("submittedBy", "name email");

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found for this quiz" });
    }

    res.status(200).json({ message: "Quiz submissions retrieved", submissions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};