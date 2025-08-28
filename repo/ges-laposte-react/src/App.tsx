import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotificationContainer from './components/NotificationContainer/NotificationContainer';
import BackToTop from './components/BackToTop/BackToTop';
import Home from './pages/Home/Home';
import StepBasedTool from './pages/Tool/StepBasedTool';
import './pages/Tool/ToolV2.css';
import Results from './pages/Results/Results';
import Environment from './pages/Environment/Environment';
import About from './pages/About/About';
import FAQ from './pages/FAQ/FAQ';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Log de démarrage de l'application
    console.log('🚀 Application La Poste - Calculateur GES v2.0 initialisée');
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/outil" element={<StepBasedTool />} />
            <Route path="/resultats" element={<Results />} />
            <Route path="/environnement" element={<Environment />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          <Footer />
          <NotificationContainer />
          <BackToTop />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
