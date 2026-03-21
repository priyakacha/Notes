import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotePage from "./pages/notePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
