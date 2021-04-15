const router = require("express").Router();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// const exerciseRoute = require("./exerciseRoutes");
const workoutRoute = require("./workoutRoutes");

// router.use("/exercises", exerciseRoute);
router.use("/workouts", workoutRoute);

module.exports = router;
