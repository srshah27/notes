import connectMongo from '../../../lib/dbConnect'
import Note from '../../../models/Note'

export default async function handler(req, res) {
  await connectMongo();
  let notes = await Note.find({})
  res.status(200).json({notes});
}