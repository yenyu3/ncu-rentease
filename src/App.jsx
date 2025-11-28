import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabBar from './components/TabBar';
import Home from './pages/Home';
import Map from './pages/Map';
import Favorites from './pages/Favorites';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}

export default App;