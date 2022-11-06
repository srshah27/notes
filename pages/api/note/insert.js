import connectMongo from '../../../lib/dbConnect'
import Note from '../../../models/Note'

export default async function addTest(req, res) {
  try {
    await connectMongo();
    console.log(req.body);
    const test = await Note.create(req.body);

    res.json({ test });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}