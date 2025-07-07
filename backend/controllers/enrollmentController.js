const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// @desc Enroll a user in a course
// @route POST /api/enrollment/enroll
// @access Private (User)
exports.enrollUser = async (req, res) => {
    try{
        const courseId = req.params.courseId;
        const userId = req.user.id;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if the user is already enrolled
        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "User is already enrolled in this course" });
        }

        // Create a new enrollment
        const enrollment = new Enrollment({
            user: userId,
            course: courseId
        });
        await enrollment.save();

        res.status(201).json({ message: "User enrolled successfully", enrollment });
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// @desc Get all enrollments for a user
// @route GET /api/enrollment/me
// @access Private (User)
exports.getMyEnrollments = async (req, res) => {
    try{
        const userId = req.user.id;

        // Find all enrollments for the user
        const enrollments = await Enrollment.find({ user: userId })
            .populate('course', 'title description') // Populate course details
            .populate('user', 'name email'); // Populate user details

        res.status(200).json(enrollments);
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// @desc Get all enrollments for a user
// @route GET /api/enrollment/:userId
// @access Private (Coordinator)
exports.getUserEnrollments = async (req, res) => {
    try{
        const userId = req.params.userId;

        // Find all enrollments for the user
        const enrollments = await Enrollment.find({ user: userId })
            .populate('course', 'title description') // Populate course details
            .populate('user', 'name email'); // Populate user details

        res.status(200).json(enrollments);
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// @desc Get all enrollments for a course
// @route GET /api/enrollment/course/:courseId
// @access Private (Coordinator, Educator)
exports.getEnrollmentsByCourse = async (req, res) => {
    try{
        const { role, id: userId } = req.user;
        const courseId = req.params.courseId;

        // Fetch course and check if it exists
        const course = await Course.findById(courseId).populate("createdBy", "name email role");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check permissions
        const isEducator = course.createdBy && course.createdBy._id.toString() === userId;

        if (role === "coordinator" || (role === "educator" && isEducator)) {
        const enrollments = await Enrollment.find({ course: courseId }).populate("user", "name email");

        return res.status(200).json({
            course: {
            id: course._id,
            title: course.title,
            createdBy: course.createdBy,
            },
            enrollments,
        });
        }

        return res.status(403).json({ message: "Forbidden: Unauthorized to access enrollments for this course" });
    }catch(error){
        res.status(500).json({ message: "Server error" });
        console.error("Error fetching enrollments by course:", error);
    }
}

// @desc Update enrollment status
// @route PUT /api/enrollment/:id/status
// @access Private (Coordinator, Educator)
exports.updateEnrollmentStatus = async (req, res) => {
    try{
        const enrollmentId = req.params.id;
        const { status } = req.body;

        // Validate status
        if (!status || !["enrolled", "completed", "dropped", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find and update the enrollment
        const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { status }, { new: true });
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.status(200).json({ message: "Enrollment status updated", enrollment });
    } catch (error) {
        console.error("Error updating enrollment status:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// @desc reject an enrollment
// @route PUT /api/enrollment/:id
// @access Private (Coordinator, Educator)
exports.rejectEnrollment = async (req, res) => {

}

// @desc Delete an enrollment
// @route DELETE /api/enrollment/:id   
// @access Private (Coordinator, Educator)
exports.deleteEnrollment = async (req, res) => {

}