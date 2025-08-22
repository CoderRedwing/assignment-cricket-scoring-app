import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchesList from "./pages/MatchesList";
import MatchDetails from "./pages/MatchDetails";
import LiveCommentary from "./pages/LiveCommentary";
import AddCommentary from "./pages/AddCommentary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchesList />} />

        <Route path="/match/:id" element={<MatchDetails />} />

        <Route path="/match/:id/live" element={<LiveCommentary />} />

        <Route path="/match/:id/add" element={<AddCommentary />} />
      </Routes>
    </Router>
  );
}

export default App;
