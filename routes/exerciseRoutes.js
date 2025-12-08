const express = require("express");
const { Exercise } = require("../database/setup");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const exercise = await Exercise.create({ name, category });
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    const { name, category } = req.body;
    if (name) exercise.name = name;
    if (category) exercise.category = category;
    await exercise.save();
    res.json(exercise);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    await exercise.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
