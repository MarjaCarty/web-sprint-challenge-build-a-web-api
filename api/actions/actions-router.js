// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const Project = require("../projects/projects-model");

const router = express.Router();

const validateProjectId = async (req, res, next) => {
  const checkedProject = await Project.get(req.body.project_id);

  if (!checkedProject) {
    res.status(404).json({ message: "This project_id does not exist" });
  } else {
    next();
  }
};

const validateActionId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkedAction = await Action.get(id);

    if (!checkedAction) {
      res
        .status(404)
        .json({ message: "An action with this id does not exist" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "action error", error: err.message });
  }
};

const validateAction = (req, res, next) => {
  if (!req.body.project_id && !req.body.description && !req.body.notes) {
    res.status(400).json({ message: "Missing action data" });
  }

  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "Project id, description, and notes are required",
      body: req.body,
    });
  } else {
    next();
  }
};

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
router.post("/", validateProjectId, validateAction, async (req, res) => {
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

router.get("/:id", validateActionId, async (req, res) => {
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
router.put("/:id", validateActionId, async (req, res) => {
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
router.delete("/:id", validateActionId, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Action.remove(id);
    res
      .status(200)
      .json({ message: `${deleted} actions successfully deleted` });
  } catch (err) {
    res.status(500).json({
      message: "There was an error deleting action",
      error: err.message,
    });
  }
});

module.exports = router;
