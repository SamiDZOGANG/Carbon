import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import './Header.css';

// Import lazy pour le formulaire
const StepForm = React.lazy(() => import('../StepForm/StepForm'));

const Header: React.FC = () => {
  const { state, toggleMobileMenu, saveFormData } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileMenuOpen, isScrolled } = state.navigation;
  const [showForm, setShowForm] = useState(false);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/outil', label: 'Outil' },
    { path: '/environnement', label: 'Objectif' },
    { path: '/apropos', label: 'À propos' },
    { path: '/faq', label: 'FAQ' },
    { path: '/resultats', label: 'Résultats' }
  ];

  const handleFormSubmit = (data: any) => {
    // Sauvegarder les données
    saveFormData(data);
    // Fermer le formulaire
    setShowForm(false);
    // Naviguer vers les résultats
    navigate('/resultats');
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <>
        <React.Suspense fallback={
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div style={{ color: 'white', fontSize: '1.5rem' }}>
              Chargement du formulaire...
            </div>
          </div>
        }>
          <StepForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </React.Suspense>
      </>
    );
  }

  return (
    <header className={`header-laposte ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-laposte">La Poste</div>
          <h1 className="header-title">Engagement pour la neutralité carbone</h1>
        </div>

        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => isMobileMenuOpen && toggleMobileMenu()}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button 
            className="cta-header-btn"
            onClick={() => setShowForm(true)}
          >
            Démarrer l'analyse
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;