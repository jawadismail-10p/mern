import express from "express";
import * as notesController from "../controllers/notes";

const router = express.Router();

router.get("/", notesController.getNotes);

router.post("/", notesController.createNotes);

router.get("/:noteId", notesController.getNoteById);

router.patch("/:noteId", notesController.updateNote);

router.delete("/:noteId", notesController.deleteNote);

export default router;
