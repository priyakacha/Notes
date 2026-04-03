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
        setNote(data.data.Note);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteNote = async () => {
    await fetch(`http://localhost:8080/api/v1/notes/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-[#202125] flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202125]">
      <div className="sticky top-0 bg-[#292a2c] border-b px-10 py-5 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-white hover:opacity-80"
        >
          ← Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/update/${note._id}`)}
            className="px-4 py-1.5 text-sm rounded-lg border border-gray-500 hover:bg-gray-700 transition text-white"
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

      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl bg-[#292a2c] rounded-2xl shadow-xl p-8 transition hover:shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-6 leading-snug">
            {note.title}
          </h1>

          <div className="h-[1px] bg-gray-700 mb-6"></div>

          <div className="text-lg text-white leading-8 whitespace-pre-line">
            {note.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
