import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PollPage from "./pages/PollPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/polls/:id" element={<PollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
