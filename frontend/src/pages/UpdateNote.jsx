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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Note</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded h-28"
            required
          />

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
