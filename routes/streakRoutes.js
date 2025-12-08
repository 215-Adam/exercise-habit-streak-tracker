const express = require("express");
const { Streak } = require("../database/setup");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const streaks = await Streak.findAll({
      where: { userId: req.user.id }
    });
    res.json(streaks);
  } catch (err) {
    next(err);
  }
});

router.get("/me/:exerciseId", requireAuth, async (req, res, next) => {
  try {
    const streak = await Streak.findOne({
      where: {
        userId: req.user.id,
        exerciseId: req.params.exerciseId
      }
    });
    if (!streak) {
      return res.status(404).json({ error: "Streak not found" });
    }
    res.json(streak);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:userId", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const streaks = await Streak.findAll({
      where: { userId: req.params.userId }
    });
    res.json(streaks);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
