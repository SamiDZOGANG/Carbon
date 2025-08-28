import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { showNotification } from '../../components/NotificationContainer/NotificationContainer';
import './ToolV2.css';
import './ModernTool.css';

// Import lazy pour détecter les erreurs
const StepForm = React.lazy(() => import('../../components/StepForm/StepForm'));

const StepBasedTool: React.FC = () => {
  const navigate = useNavigate();
  const { saveFormData } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  const handleStartForm = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (data: any) => {
    // Save all form data
    saveFormData(data);
    
    // Show success notification
    showNotification('Bilan GES complété avec succès !', 'success');
    
    // Navigate to results
    navigate('/resultats');
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
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
    );
  }

  return (
    <div style={{ padding: '1rem 2rem', backgroundColor: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <div style={{ margin: '10px 0' }}>
          <div style={{ 
            background: 'rgba(255, 209, 0, 0.15)', 
            border: '1px solid #FFD100', 
            borderRadius: '50px', 
            padding: '0.4rem 0.8rem', 
            fontSize: '0.7rem',
            fontWeight: '400',
            color: '#003366',
            display: 'inline-block'
          }}>
            Outil Professionnel La Poste
          </div>
        </div>
        
        <h2 className="section-title">Calculateur Bilan GES</h2>
        
        <div style={{ margin: '10px auto', maxWidth: '1000px' }}>
          <p style={{ 
            fontSize: '1rem', 
            color: '#555', 
            lineHeight: '1.5',
            textAlign: 'justify',
            fontWeight: '400'
          }}>
            Réalisez un bilan d'émissions complet en suivant une méthodologie éprouvée 
            à travers 6 étapes structurées. L'outil couvre exhaustivement les scopes 1, 2 et 3 
            selon les standards internationaux pour une analyse précise de votre empreinte carbone.
          </p>
        </div>
        
        <div style={{ margin: '10px auto', maxWidth: '1000px' }}>
          <p style={{ 
            fontSize: '1rem', 
            color: '#555', 
            lineHeight: '1.5',
            textAlign: 'justify',
            fontWeight: '400'
          }}>
            Chaque module d'analyse vous guide avec des descriptions explicatives, 
            des champs sélectionnables adaptés à votre contexte, et des données de référence 
            pour faciliter la saisie et améliorer la précision de votre bilan.
          </p>
        </div>
        
        <div style={{ margin: '10px auto', maxWidth: '1000px' }}>
          <p style={{ 
            fontSize: '1rem', 
            color: '#555', 
            lineHeight: '1.5',
            textAlign: 'justify',
            fontWeight: '400'
          }}>
            Bénéficiez d'une interface intuitive avec navigation guidée, 
            sauvegarde automatique à chaque étape, et génération de rapports détaillés 
            avec recommandations personnalisées pour votre trajectoire de décarbonation.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap', 
          marginBottom: '3rem'
        }}>
          <div style={{ 
            background: '#fff', 
            padding: '2rem 1.5rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem' }}>6</div>
            <div style={{ fontSize: '1rem', color: '#666' }}>Étapes d'analyse</div>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: '2rem 1.5rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem' }}>3</div>
            <div style={{ fontSize: '1rem', color: '#666' }}>Scopes couverts</div>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: '2rem 1.5rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#003366', marginBottom: '0.5rem' }}>100%</div>
            <div style={{ fontSize: '1rem', color: '#666' }}>Conforme ADEME</div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleStartForm}
            style={{
              background: '#003366',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 51, 102, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            Démarrer l'Analyse
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              color: '#003366',
              border: '2px solid #003366',
              padding: '1.2rem 2rem',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Retour Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepBasedTool;