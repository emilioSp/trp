import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MemberDetail from './pages/MemberDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trp" element={<Home />} />
      <Route path="/member/:id" element={<MemberDetail />} />
    </Routes>
  );
}

export default App;
