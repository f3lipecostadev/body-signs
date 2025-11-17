import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Videos from './pages/Videos/Videos';
import Contact from './pages/Contact/Contact';
import Games from './pages/Games/Games';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/games" element={<Games />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
