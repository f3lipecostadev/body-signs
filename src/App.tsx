import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Games from './pages/Games';
import './index.css';

export default function App(){
  return(
    <Router>
      <div className="min-h-screen bg-background text-text font-[Poppins]">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/games" element={<Games />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
};
