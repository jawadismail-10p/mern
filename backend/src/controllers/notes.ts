import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    return res.status(200).json(notes);
  } catch (e) {
    next(e);
  }
};

interface ICreateNoteRequest {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<
  unknown,
  unknown,
  ICreateNoteRequest,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Title is required");
    }
    const newNote = await NoteModel.create({ title, text });
    return res.status(201).json(newNote);
  } catch (e) {
    next(e);
  }
};

export const getNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    return res.status(200).json(note);
  } catch (e) {
    next(e);
  }
};

interface IUpdateNoteParams {
  noteId: string;
}

interface IUpdateNoteRequest {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  IUpdateNoteParams,
  unknown,
  IUpdateNoteRequest,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Title is required");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    note.title = newTitle;
    note.text = newText;
    const updatedNote = await note.save();
    return res.status(200).json(updatedNote);
  } catch (e) {
    next(e);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    const note = await NoteModel.findByIdAndDelete(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
}