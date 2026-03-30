import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setNotes(data.data.AllNote);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-pink-300 px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
          <p className="text-gray-500 mt-1 text-xl">
            Organize your thoughts beautifully
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-lg shadow-md transition"
        >
          + New Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            onClick={() => navigate(`/note/${note._id}`)}
            className="bg-purple-400 p-5 rounded-2xl h-[300px] shadow-sm hover:shadow-lg cursor-pointer transition duration-300 border border-gray-100"
          >
            <h2 className="font-semibold text-2xl text-black mb-2">
              {note.title}
            </h2>

            <p className="text-black text-xl line-clamp-5">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
