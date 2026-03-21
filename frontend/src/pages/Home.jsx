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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      <div className="grid grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            onClick={() => navigate(`/note/${note._id}`)}
            className="bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-gray-200"
          >
            <h2 className="font-semibold text-xl">{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
