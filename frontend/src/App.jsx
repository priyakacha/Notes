import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotePage from "./pages/notePage";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/update/:id" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
