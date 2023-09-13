import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

interface IncomingBody {
  title: string;
  description?: string;
}

export const create: RequestHandler = async (req, res) => {
  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  res.json({ message: "Note created!" });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  const { title, description } = req.body as IncomingBody;

  const note = await Note.findByIdAndUpdate(
    noteId,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  if (!note) return res.json({ error: "Note not fou nd!" });

  await note.save();

  res.json({ note });
};

export const deleteNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await Note.findByIdAndDelete(noteId);

  if (!removedNote) res.json({ message: "Note not found!" });

  res.json({ message: "Note removed successfully!" });
};

export const getNoteById: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) return res.json({ message: "Note not found!" });

  res.json({ note });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();

  res.json({ notes });
};