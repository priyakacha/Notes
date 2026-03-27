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
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Note</h1>

      <form onSubmit={createNote} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded h-32"
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Create Note
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
