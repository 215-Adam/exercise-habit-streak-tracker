const express = require("express");
const { Streak } = require("../database/setup");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(20, Math.max(1, Number(req.query.limit || 10)));
    const offset = (page - 1) * limit;

    const { rows, count } = await Streak.findAndCountAll({
      where: { userId: req.user.id },
      limit,
      offset
    });

    res.json({
      page,
      limit,
      total: count,
      data: rows
    });
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
