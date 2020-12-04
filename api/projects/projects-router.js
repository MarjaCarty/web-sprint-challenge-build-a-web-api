// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving projects",
      error: err.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({
      message: "There was an error creating project",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.get(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving project",
      error: err.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const update = await Project.update(id, req.body);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({
      message: "There was an error updating project",
      error: err.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Project.remove(id);
    res
      .status(200)
      .json({ message: `${deleted} projects successfully deleted` });
  } catch (err) {
    res.status(500).json({
      message: "There was an error deleting project",
      error: err.message,
    });
  }
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    const actions = await Project.getProjectActions(id);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({
      message: "There was an error retrieving actions",
      error: err.message,
    });
  }
});

module.exports = router;
