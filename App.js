import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookRecommendation from './components/BookRecommendation';
import Login from './components/Login';
import Recom from './components/Recom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookRecommendation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Recommend" element={<Recom />} />
      </Routes>
    </Router>
  );
}

export default App;
