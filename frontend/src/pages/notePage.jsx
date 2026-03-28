import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNote(data.data.Note);
      });
  }, [id]);

  const deleteNote = async () => {
    await fetch(`http://localhost:8080/api/v1/notes/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  };

  if (!note) return;
  <div className="bg-pink-300 min-h-screen ">
    <p>Loading...</p>;
  </div>;

  return (
    <div className="min-h-screen bg-pink-300 px-6 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-purple-400 p-8 rounded-2xl shadow-md border border-black">
        {/* Top Actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-red-500 hover:text-black transition"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/update/${note._id}`)}
              className="px-4 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              Edit
            </button>

            <button
              onClick={deleteNote}
              className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-black leading-tight">
          {note.title}
        </h1>

        {/* Divider */}
        <div className="h-[1px] bg-black my-6"></div>

        {/* Description */}
        <p className="text-black text-lg leading-relaxed whitespace-pre-line">
          {note.description}
        </p>
      </div>
    </div>
  );
}

export default NotePage;
