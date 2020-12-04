// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving actions",
      error: err.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({
      message: "There was an error creating action",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const action = await Action.get(id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving action",
      error: err.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const update = await Action.update(id, req.body);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({
      message: "There was an error updating action",
      error: err.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Action.remove(id);
    res
      .status(200)
      .json({ message: `${deleted} messages successfully deleted` });
  } catch (err) {
    res.status(500).json({
      message: "There was an error deleting action",
      error: err.message,
    });
  }
});

module.exports = router;
