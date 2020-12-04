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

router.get("/:id", async (req, res) => {});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

router.get("/:id/actions", async (req, res) => {});

module.exports = router;
