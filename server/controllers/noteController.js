const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ userId: req.userId, title, content });
  res.json(newNote);
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  if (note.userId.toString() !== req.userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
};
