import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["title is main for notes"],
    trim: true,
    unique: true,
    maxlength: [50, "title limite is just 50 characters"],
    minlength: [3, "title is at least 3 characters"],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
