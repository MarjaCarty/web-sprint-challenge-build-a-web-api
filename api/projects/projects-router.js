// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");

const router = express.Router();

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkedProject = await Project.get(id);

    if (!checkedProject) {
      res
        .status(404)
        .json({ message: "A project with this id does not exist" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "project error", error: err.message });
  }
};

const validateProject = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Missing project data" });
  }

  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Name and description are required" });
  } else {
    next();
  }
};

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
router.post("/", validateProject, async (req, res) => {
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

router.get("/:id", validateProjectId, async (req, res) => {
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
router.put("/:id", validateProjectId, async (req, res) => {
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
router.delete("/:id", validateProjectId, async (req, res) => {
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

router.get("/:id/actions", validateProjectId, async (req, res) => {
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
