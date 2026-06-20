import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Chapters from './pages/Chapters';
import CoreGroups from './pages/CoreGroups';
import Membership from './pages/Membership';
import Courses from './pages/Courses';
import Journal from './pages/Journal';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Policies from './pages/Policies';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/core-groups" element={<CoreGroups />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Policies defaultTab="privacy" />} />
            <Route path="/terms-and-conditions" element={<Policies defaultTab="terms" />} />
            <Route path="/refund-policy" element={<Policies defaultTab="refund" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
