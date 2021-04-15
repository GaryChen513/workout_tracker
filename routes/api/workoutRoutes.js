const router = require("express").Router();
const { Workout } = require("../../models");

router.get("/", (req, res) => {
  Workout.find({})
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", ({ body }, res) => {
  Workout.create(body)
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        exercises: req.body,
      },
    },
    { new: true }
  )
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/range", (req, res) => {
  
  Workout.find({})
    .then((workoutData) => {
      const length = workoutData.length;
      if (length <= 7) {
        return workoutData;
      }

      return workoutData.slice(length - 7, length);
    })
    .then((sevenWorkoutData) => {
      const newSevenWorkouts = sevenWorkoutData.map((workout) => {
        const totalDuration = workout.exercises.reduce(
          (total, { duration }) => total + duration,
          0
        );

        const newWorkout = {
          totalDuration,
          _id: workout._id,
          day: workout.day,
          exercises: workout.exercises,
        };

        return newWorkout;
      });
      res.json(newSevenWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
