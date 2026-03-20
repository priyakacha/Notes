import Notes from "../model/noteModel.js";

export const getAllNote = async (req, res) => {
  try {
    const AllNote = await Notes.find();

    res.status(200).json({
      status: "success",
      result: AllNote.length,
      data: {
        AllNote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const Note = await Notes.findOne({ id: req.params.id });

    res.status(200).json({
      status: "success",
      data: {
        Note: Note,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const newNotes = await Notes.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Notes: newNotes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const UpdateNote = await Notes.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: "success",
      data: {
        note: UpdateNote,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Notes.findOneAndDelete({ id: req.params.id });
    res.status(204).json({
      status: "success",
      message: "Note is Deleted",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
