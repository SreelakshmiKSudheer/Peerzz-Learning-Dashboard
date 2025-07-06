const Course = require("../models/Course")
const Module = require("../models/Module")
const Assignment = require("../models/Assignments")


// @desc Create a new assignment
// @route POST /api/assignment/create
// @access Protected (educator only)
exports.createAssignment = async (req, res) => {
    try{
        const educatorId = req.user.id || req.user._id;
        if (!educatorId) {
            return res.status(403).json({ message: "Unauthorized: Educator ID not found" });
        }
        const assignmentData = {
            ...req.body,
            createdBy: educatorId,
        };
        const newAssignment = await Assignment.create(assignmentData);
        res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });
    }catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Update an existing assignment
// @route PUT /api/assignment/update/:id
exports.updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id || req.user._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User ID not found" });
        }
        const assignmentData = {
            ...req.body,
            updatedBy: userId,
        };
        const updatedAssignment = await Assignment.findByIdAndUpdate(id, assignmentData, { new: true });
        if (!updatedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment updated successfully", assignment: updatedAssignment });
    } catch (error) {
        console.error("Error updating assignment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Delete an assignment
// @route DELETE /api/assignment/delete/:id
exports.deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id || req.user._id;
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized: User ID not found" });
        }
        const deletedAssignment = await Assignment.findByIdAndDelete(id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.error("Error deleting assignment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Get assignment by ID
// @route GET /api/assignment/:id
exports.getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findById(id)
            .populate("course", "title description");
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment retrieved successfully", assignment });
    } catch (error) {
        console.error("Error retrieving assignment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Get all assignments for a course
// @route GET /api/assignment/course/:courseId
exports.getAssignmentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const assignments = await Assignment.find({ course: courseId })
            .populate("course", "title description");
        res.status(200).json({ message: "Assignments retrieved successfully", assignments });
    } catch (error) {
        console.error("Error retrieving assignments:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
