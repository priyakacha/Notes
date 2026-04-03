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
    <div className="min-h-screen bg-[#202125] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-2xl bg-[#292a2c] p-8 rounded-3xl shadow-lg border border-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Note ✏️</h2>

          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-pink-200 text-xl transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <div>
            <label className="text-xl text-white mb-1 ml-2 block">Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-[#292a2c]"
              required
            />
          </div>

          <div>
            <label className="text-xl text-white mb-1 ml-2 block">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Update your note..."
              className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-[#292a2c] h-40 resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-white">Editing your note</span>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-1.5 text-sm rounded-lg border border-gray-500 hover:bg-gray-700 transition text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
