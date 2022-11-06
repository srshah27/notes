import { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
  noteMainTitle: String,
  noteSubTitle: String,
  noteDescription: String,
})

const Note = models.Note || model('Note', NoteSchema);

export default Note;