const express = require("express");
const { Workout, Streak } = require("../database/setup");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function updateStreakForWorkout(userId, exerciseId, workoutDate) {
  const existing = await Streak.findOne({
    where: { userId, exerciseId }
  });

  const newDate = new Date(workoutDate);
  const prevDate = existing && existing.lastWorkoutDate
    ? new Date(existing.lastWorkoutDate)
    : null;

  let currentStreak = 1;
  let longestStreak = 1;

  if (!existing) {
    await Streak.create({
      userId,
      exerciseId,
      currentStreak,
      longestStreak,
      lastWorkoutDate: workoutDate
    });
    return;
  }

  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = prevDate ? Math.round((newDate - prevDate) / oneDayMs) : null;

  if (diffDays === 1) {
    currentStreak = existing.currentStreak + 1;
  } else if (diffDays === 0) {
    currentStreak = existing.currentStreak;
  } else {
    currentStreak = 1;
  }

  longestStreak = Math.max(existing.longestStreak, currentStreak);

  existing.currentStreak = currentStreak;
  existing.longestStreak = longestStreak;
  existing.lastWorkoutDate = workoutDate;
  await existing.save();
}

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({
      where: { userId: req.user.id }
    });
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { exerciseId, date, duration, notes } = req.body;
    if (!exerciseId || !date || !duration) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const workout = await Workout.create({
      userId: req.user.id,
      exerciseId,
      date,
      duration,
      notes: notes || null
    });

    await updateStreakForWorkout(req.user.id, exerciseId, date);

    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const { date, duration, notes } = req.body;
    if (date) workout.date = date;
    if (duration) workout.duration = duration;
    if (notes !== undefined) workout.notes = notes;

    await workout.save();

    res.json(workout);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ error: "Workout not found" });
    }

    await workout.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
