import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createNote = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    console.log("Created:", data);

    // after create → go back to home
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-purple-400 p-8 rounded-2xl shadow-md border border-black">
        {/* Header */}
        <h1 className="text-3xl font-bold text-black mb-2">Create Note</h1>
        <p className="text-black text-sm mb-6">
          Capture your thoughts clearly and quickly
        </p>

        {/* Form */}
        <form onSubmit={createNote} className="flex flex-col gap-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-black"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Write your note here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-black h-40 resize-none"
            required
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition shadow-sm"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
