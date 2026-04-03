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

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#202125]">
      {/* Top Bar */}
      <div className="sticky top-0 bg-[#292a2c] backdrop-blur border-b px-10 py-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-1.5 text-sm rounded-lg border border-gray-500 hover:bg-gray-700 transition text-white"
        >
          Cancel
        </button>

        {/* Save */}
        <button
          onClick={createNote}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Save
        </button>
      </div>

      {/* Editor */}
      <div className="w-full px-80 py-20">
        <form onSubmit={createNote} className="space-y-6">
          <input
            type="text"
            placeholder="Untitled Note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-5xl font-bold bg-transparent outline-none placeholder-gray-300 text-white"
            required
            autoFocus
          />

          <div className="h-[1px] bg-gray-200"></div>

          <textarea
            placeholder="Start writing your thoughts..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-lg text-white bg-transparent outline-none resize-none min-h-[calc(100vh-200px)] leading-8 placeholder-gray-400"
            required
          />
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
