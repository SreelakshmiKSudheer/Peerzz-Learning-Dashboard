exports.isCoordinator = (req, res, next) => {
  if (req.user?.role !== "coordinator") {
    return res.status(403).json({ message: "Access denied: Coordinator only" });
  }
  next();
};

exports.isEducator = (req, res, next) => {
  if (req.user?.role !== "educator") {
    return res.status(403).json({ message: "Access denied: Educator only" });
  }
  next();
};

exports.isLearner = (req, res, next) => {
  if (req.user?.role !== "learner") {
    return res.status(403).json({ message: "Access denied: Learner only" });
  }
  next();
};
