// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
