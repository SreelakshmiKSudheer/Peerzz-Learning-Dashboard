const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Submission = require("../models/Submissions");
const Assignment = require("../models/Assignments");
const Quiz = require("../models/Quiz");


exports.getPublicDashboard = async (req, res) => {
try {
// Fetch top 3 popular domains based on total view count
const popularDomains = await Course.aggregate([
{
  $group: {
  _id: "$domain",
  totalViews: { $sum: "$views" },
  },
  },
  { $sort: { totalViews: -1 } },
  { $limit: 3 },
  ]);// Fetch top 6 most viewed courses
  const popularCourses = await Course.find({ status: "active" })
    .sort({ views: -1 })
    .limit(6)
    .select("title description domain views rating image");

  // Fetch recent reviews from courses
  const recentReviews = await Course.aggregate([
    { $unwind: "$reviews" },
    { $sort: { "reviews.createdAt": -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "reviews.user",
        foreignField: "_id",
        as: "reviewUser",
      },
    },
    {
      $project: {
        courseId: "$_id", // fixed here
        courseTitle: "$title",
        rating: "$reviews.rating",
        comment: "$reviews.comment",
        createdAt: "$reviews.createdAt",
        user: { $arrayElemAt: ["$reviewUser", 0] },
      },
    },
]);

res.status(200).json({
  popularDomains,
  popularCourses,
  recentReviews,
});
} catch (err) {
console.error("Dashboard error:", err);
res.status(500).json({ message: "Server error", error: err.message });
}
};


exports.getLearnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Top 3 most viewed domains
    const topDomains = await Course.aggregate([
      { $group: { _id: "$domain", totalViews: { $sum: "$views" } } },
      { $sort: { totalViews: -1 } },
      { $limit: 3 }
    ]);

    // 2. Courses learner is enrolled in
    const enrollments = await Enrollment.find({ user: userId })
      .populate({
        path: "course",
        select: "title domain image views startDate endDate status"
      });

    const myCourses = enrollments.map(e => e.course);

    // 3. Upcoming Deadlines (assignments/quizzes)
    const courseIds = myCourses.map(c => c._id);

    const upcomingAssignments = await Assignment.find({
      course: { $in: courseIds },
      deadline: { $gte: new Date() }
    }).sort({ deadline: 1 });

    const upcomingQuizzes = await Quiz.find({
      course: { $in: courseIds },
      createdAt: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) } // within last 7 days
    }).sort({ createdAt: -1 });

    // 4. Incomplete Tasks (not yet submitted)
    const submissions = await Submission.find({ submittedBy: userId });
    const submittedAssignmentIds = submissions
      .filter(s => s.subtype === "Assignment")
      .map(s => s.submittedAgainst.toString());
    const submittedQuizIds = submissions
      .filter(s => s.subtype === "Quiz")
      .map(s => s.submittedAgainst.toString());

    const incompleteAssignments = upcomingAssignments.filter(a =>
      !submittedAssignmentIds.includes(a._id.toString())
    );

    const incompleteQuizzes = upcomingQuizzes.filter(q =>
      !submittedQuizIds.includes(q._id.toString())
    );

    // 5. Activity Overview
    const totalSubmissions = submissions.length;
    const totalCourses = myCourses.length;
    const assignmentSubmissions = submissions.filter(s => s.subtype === "Assignment").length;
    const quizSubmissions = submissions.filter(s => s.subtype === "Quiz").length;

    const activity = {
      totalSubmissions,
      totalCourses,
      assignmentSubmissions,
      quizSubmissions
    };

    res.status(200).json({
      topDomains,
      myCourses,
      upcoming: {
        assignments: upcomingAssignments,
        quizzes: upcomingQuizzes
      },
      incomplete: {
        assignments: incompleteAssignments,
        quizzes: incompleteQuizzes
      },
      activity
    });
  } catch (err) {
    console.error("Learner Dashboard Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getEducatorDashboard = async (req, res) => {
try {
const educatorId = req.user.id;
// All courses created by the educator
const allCourses = await Course.find({ createdBy: educatorId });

// Active courses
const activeCourses = allCourses.filter(course => course.status === "active");

// Assignments and Quizzes created by the educator
const assignmentIds = await Assignment.find({ createdBy: educatorId }).distinct("_id");
const quizIds = await Quiz.find({ createdBy: educatorId }).distinct("_id");

// All submissions for these assignments and quizzes
const allSubmissions = await Submission.find({
  submittedAgainst: { $in: [...assignmentIds, ...quizIds] }
})
  .populate("submittedBy", "name email")
  .populate("submittedAgainst");

// Latest 5 submissions (sorted by submittedAt)
const latestSubmissions = allSubmissions
  .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  .slice(0, 5);

// Submissions that have not been evaluated
const pendingSubmissions = allSubmissions.filter(sub => !sub.evaluated);

// Summary
const activity = {
  totalCourses: allCourses.length,
  totalSubmissions: allSubmissions.length,
  pendingEvaluations: pendingSubmissions.length
};

res.status(200).json({
  activeCourses,
  allCourses,
  latestSubmissions,
  pendingSubmissions,
  activity
});
} catch (err) {
console.error("Educator Dashboard Error:", err);
res.status(500).json({ message: "Server error", error: err.message });
}
};