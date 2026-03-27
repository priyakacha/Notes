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
    <div className="p-8 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-red-400 hover:bg-pink-300 text-white px-4 py-2 rounded text-xl"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            onClick={() => navigate(`/note/${note._id}`)}
            className="bg-purple-300 p-4 rounded-xl shadow cursor-pointer hover:bg-purple-400 transition text-black font-bold"
          >
            <h2 className="font-semibold text-xl">{note.title}</h2>
            <p className="line-clamp-2 text-gray-800 font-medium ">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
