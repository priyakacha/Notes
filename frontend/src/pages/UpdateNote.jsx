import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // fetch existing note
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const note = data.data.Note || data.data.note;
        setTitle(note.title);
        setDescription(note.description);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8080/api/v1/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    console.log("Updated:", data);

    navigate(`/note/${id}`);
  };

  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-purple-400 p-8 rounded-2xl shadow-md border border-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold txt-gray-800">Edit Note</h2>

          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
            required
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update your note..."
            className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-red-500 text-black h-32 resize-none"
            required
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
