import express from "express";
import {
  createNote,
  deleteNote,
  getAllNote,
  getNote,
  updateNote,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.route("/").post(createNote).get(getAllNote);
router.route("/:id").get(getNote).patch(updateNote).delete(deleteNote);

export default router;
