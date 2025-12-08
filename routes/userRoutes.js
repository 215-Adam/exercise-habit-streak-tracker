const express = require("express");
const { User } = require("../database/setup");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "role"]
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
