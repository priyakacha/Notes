import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/notes")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setNotes(data.data.AllNote);
        }
        setLoading(false); // 👈 important
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const now = new Date();

  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = now.getDate();
  const month = now.toLocaleDateString("en-US", { month: "long" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-[#202125]">
        <p className="text-white text-lg">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202125]">
      {/* Navbar */}
      <div className="flex items-center justify-between px-10 py-5 bg-[#292a2c] shadow-sm">
        <h1 className="text-2xl font-bold text-white">📜 NoteFlow</h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-white hover:bg-[#f4f4f4] text-black px-5 py-2 rounded-xl shadow transition"
        >
          + New Note
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h2 className="text-5xl font-bold text-white mb-4">
          Capture Your Ideas ✨
        </h2>
        <p className="text-white text-lg max-w-xl mx-auto">
          A simple and beautiful way to organize your thoughts 💭, tasks, and
          ideas 💡.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-10 mb-16">
        <div className="bg-[#292a2c] p-6 rounded-2xl shadow text-center w-40">
          <h3 className="text-4xl font-bold text-white">{notes.length}</h3>
          <p className="text-white text-2xl">Notes</p>
        </div>

        <div className="bg-[#292a2c] p-6 rounded-2xl shadow text-center w-40">
          <h3 className="text-4xl font-bold text-white">{date}</h3>
          <p className="text-white text-2xl">{month}</p>
        </div>

        <div className="bg-[#292a2c] p-9 rounded-2xl shadow text-center w-40">
          <h3 className="text-4xl font-bold text-white">{day}</h3>
        </div>
      </div>

      {/* Notes Section */}
      <div className="px-10 pb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Your Notes</h2>

        {notes.length === 0 ? (
          <div className="text-center py-20 text-white">
            <p className="text-xl">No notes yet 😔</p>
            <p>Create your first note to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                onClick={() => navigate(`/note/${note._id}`)}
                className="bg-[#202125] p-5 rounded-2xl shadow hover:shadow-lg hover:bg-gray-950 cursor-pointer transition duration-300 border border-gray-500"
              >
                <h2 className="robot font-normal text-3xl text-white mb-2">
                  {note.title}
                </h2>

                <div className="h-[1px] bg-gray-700 mb-6"></div>

                <p className="text-[#E1E5F2] robot font-normal line-clamp-4">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
