import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MemberDetail from './pages/MemberDetail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trp" element={<Home />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
