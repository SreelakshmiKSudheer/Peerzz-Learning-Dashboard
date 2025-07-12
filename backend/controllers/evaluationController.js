const Evaluation = require("../models/Evaluation");
const Submission = require("../models/Submissions");

// POST http://localhost:3000/api/evaluation/:submissionId
// Evaluate a submission
// @route POST /api/evaluation/mark/:submissionId
// @access Private (Educator or Coordinator)

exports.evaluateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marksAwarded, feedback } = req.body;
    const evaluatedBy = req.user.id || req.user._id;

    // Check if submission exists
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Prevent duplicate evaluation
    const existing = await Evaluation.findOne({ submission: submissionId });
    if (existing) {
      return res.status(400).json({ message: "This submission is already evaluated" });
    }

    // Create new evaluation
    const evaluation = await Evaluation.create({
      submission: submissionId,
      evaluatedBy,
      marksAwarded,
      feedback,
    });

    res.status(201).json({
      message: "Evaluation recorded successfully",
      evaluation,
    });
  } catch (err) {
    console.error("Error evaluating submission:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET http://localhost:3000/api/evaluation/:submissionId
exports.getEvaluation = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const evaluation = await Evaluation.findOne({ submission: submissionId })
      .populate("evaluatedBy", "name email");

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found for this submission" });
    }

    res.status(200).json({ message: "Evaluation retrieved", evaluation });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
