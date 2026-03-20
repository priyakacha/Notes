import { useEffect, useState } from "react";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // check response
        setNotes(data.data.notes);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Notes</h1>

      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="bg-gray-200 p-4 mb-3 rounded">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
