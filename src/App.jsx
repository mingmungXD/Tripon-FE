import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './client/components/Header';
import Footer from './client/components/Footer';
import Home from './client/pages/Home';
import Resize from './client/pages/Resize';
import Loading from './client/pages/Loading';
import LocationAnalysis from './client/pages/LocationAnalysis';
import Collage from './client/pages/Collage';
import Feedback from './client/pages/Feedback';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resize" element={<Resize />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/analysis" element={<LocationAnalysis />} />
          <Route path="/collage" element={<Collage />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;