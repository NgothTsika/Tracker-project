const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const newUser = new User({ username: req.body.username });
    const saved = await newUser.save();
    res.json({ username: saved.username, _id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users
router.get("/", async (req, res) => {
  const users = await User.find({}, "username _id");
  res.json(users);
});

// POST /api/users/:_id/exercises
router.post("/:id/exercises", async (req, res) => {
  try {
    const { description, duration, date } = req.body;
    const user = await User.findById(req.params.id);

    const exercise = {
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date(),
    };

    user.log.push(exercise);
    await user.save();

    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/users/:id/logs
router.get("/:id/logs", async (req, res) => {
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    let logs = user.log;

    if (from) logs = logs.filter((ex) => new Date(ex.date) >= new Date(from));
    if (to) logs = logs.filter((ex) => new Date(ex.date) <= new Date(to));
    if (limit) logs = logs.slice(0, parseInt(limit));

    const formattedLog = logs.map((ex) => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString(),
    }));

    res.json({
      username: user.username,
      count: formattedLog.length,
      _id: user._id,
      log: formattedLog,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
