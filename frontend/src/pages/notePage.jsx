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

  if (!note) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{note.title}</h1>

      <p className="mt-4">{note.description}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={deleteNote}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotePage;
