import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { EmissionCategory } from '../../config/constants';
import { showNotification } from '../../components/NotificationContainer/NotificationContainer';
import useAutoSave, { useRestoreOnMount } from '../../hooks/useAutoSave';
import './Tool.css';

interface StepData {
  id: EmissionCategory | 'welcome' | 'review' | 'results';
  label: string;
  icon: string;
  description: string;
  component?: 'welcome' | 'category' | 'review' | 'results';
}

const ToolV2: React.FC = () => {
  const navigate = useNavigate();
  const { state, saveFormData, selectCategory, deselectCategory } = useAppContext();
  
  // États locaux
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [availableCategories, setAvailableCategories] = useState<EmissionCategory[]>([]);

  // Restauration des données sauvegardées
  const restoredData = useRestoreOnMount();

  // Système de sauvegarde automatique
  const { saveManually, clearSavedData } = useAutoSave({
    currentStep: currentStepIndex,
    completedSteps,
    availableCategories,
    formData: state.forms.formData
  });

  // Restaurer les données au montage si disponibles
  useEffect(() => {
    if (restoredData) {
      if (restoredData.currentStep !== undefined) {
        setCurrentStepIndex(restoredData.currentStep);
      }
      if (restoredData.completedSteps) {
        setCompletedSteps(restoredData.completedSteps);
      }
      if (restoredData.availableCategories) {
        setAvailableCategories(restoredData.availableCategories as EmissionCategory[]);
        restoredData.availableCategories.forEach(cat => selectCategory(cat as EmissionCategory));
      }
      if (restoredData.formData) {
        Object.entries(restoredData.formData).forEach(([key, value]) => {
          saveFormData({ [key]: value });
        });
      }
    }
  }, []);

  // Définition des étapes
  const allSteps: StepData[] = [
    {
      id: 'welcome',
      label: 'Bienvenue',
      icon: '👋',
      description: 'Introduction et sélection des catégories',
      component: 'welcome'
    },
    {
      id: 'batiments',
      label: 'Bâtiments',
      icon: '🏢',
      description: 'Consommation énergétique',
      component: 'category'
    },
    {
      id: 'flotte-propre',
      label: 'Flotte',
      icon: '🚚',
      description: 'Véhicules La Poste',
      component: 'category'
    },
    {
      id: 'transport-sous-traite',
      label: 'Transport',
      icon: '📦',
      description: 'Transport externalisé',
      component: 'category'
    },
    {
      id: 'deplacements-domicile',
      label: 'Domicile-travail',
      icon: '🏠',
      description: 'Trajets collaborateurs',
      component: 'category'
    },
    {
      id: 'deplacements-professionnels',
      label: 'Déplacements pro',
      icon: '✈️',
      description: 'Missions',
      component: 'category'
    },
    {
      id: 'frequentation',
      label: 'Fréquentation',
      icon: '👥',
      description: 'Clients et visiteurs',
      component: 'category'
    },
    {
      id: 'alimentation',
      label: 'Alimentation',
      icon: '🍽️',
      description: 'Restauration',
      component: 'category'
    },
    {
      id: 'achats',
      label: 'Achats',
      icon: '🛒',
      description: 'Consommables',
      component: 'category'
    },
    {
      id: 'dechets',
      label: 'Déchets',
      icon: '♻️',
      description: 'Gestion des déchets',
      component: 'category'
    },
    {
      id: 'review',
      label: 'Vérification',
      icon: '📋',
      description: 'Revue des données',
      component: 'review'
    },
    {
      id: 'results',
      label: 'Résultats',
      icon: '📊',
      description: 'Calcul final',
      component: 'results'
    }
  ];

  // Filtrer les étapes en fonction des catégories sélectionnées
  const getActiveSteps = () => {
    const baseSteps = [allSteps[0]]; // Welcome
    const categorySteps = allSteps.slice(1, -2).filter(step => 
      availableCategories.includes(step.id as EmissionCategory)
    );
    const finalSteps = allSteps.slice(-2); // Review & Results
    return [...baseSteps, ...categorySteps, ...finalSteps];
  };

  const [activeSteps, setActiveSteps] = useState(getActiveSteps());
  const currentStep = activeSteps[currentStepIndex];

  useEffect(() => {
    setActiveSteps(getActiveSteps());
  }, [availableCategories]);

  // Navigation entre étapes
  const goToStep = (index: number) => {
    if (index >= 0 && index < activeSteps.length) {
      // Sauvegarder l'état avant de changer d'étape
      if (currentStep.component === 'category') {
        saveCurrentStepData();
      }
      setCurrentStepIndex(index);
    }
  };

  const goToNextStep = () => {
    if (currentStepIndex < activeSteps.length - 1) {
      // Valider l'étape actuelle
      if (validateCurrentStep()) {
        // Marquer comme complétée
        if (!completedSteps.includes(currentStepIndex)) {
          setCompletedSteps([...completedSteps, currentStepIndex]);
        }
        goToStep(currentStepIndex + 1);
        showNotification('Étape validée avec succès !', 'success');
      }
    } else {
      // Fin du processus
      handleComplete();
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  // Validation des étapes
  const validateCurrentStep = (): boolean => {
    if (currentStep.component === 'welcome') {
      if (availableCategories.length === 0) {
        showNotification('Veuillez sélectionner au moins une catégorie', 'warning');
        return false;
      }
    }
    
    if (currentStep.component === 'category') {
      const categoryData = state.forms.formData[currentStep.id as EmissionCategory];
      if (!categoryData || Object.keys(categoryData).length === 0) {
        showNotification('Veuillez remplir au moins un champ', 'warning');
        return false;
      }
    }
    
    return true;
  };

  // Sauvegarde des données
  const saveCurrentStepData = () => {
    // Logique de sauvegarde implémentée dans CategoryForm
  };

  // Gestion de la sélection des catégories
  const handleCategoryToggle = (category: EmissionCategory) => {
    if (availableCategories.includes(category)) {
      setAvailableCategories(availableCategories.filter(c => c !== category));
      deselectCategory(category);
    } else {
      setAvailableCategories([...availableCategories, category]);
      selectCategory(category);
    }
  };

  // Finalisation
  const handleComplete = () => {
    showNotification('Bilan GES complété avec succès !', 'success');
    navigate('/resultats');
  };

  // Rendu des composants selon l'étape
  const renderStepContent = () => {
    switch (currentStep.component) {
      case 'welcome':
        return (
          <div className="welcome-step">
            <h2>Bienvenue dans le calculateur GES La Poste</h2>
            <p>Sélectionnez les catégories pertinentes pour votre entité :</p>
            
            <div className="selection-controls">
              <button 
                className="select-all-btn"
                onClick={() => {
                  const allCategories = allSteps.slice(1, -2).map(s => s.id as EmissionCategory);
                  if (availableCategories.length === allCategories.length) {
                    // Tout désélectionner
                    setAvailableCategories([]);
                    allCategories.forEach(cat => deselectCategory(cat));
                  } else {
                    // Tout sélectionner
                    setAvailableCategories(allCategories);
                    allCategories.forEach(cat => selectCategory(cat));
                  }
                }}
              >
                {availableCategories.length === allSteps.slice(1, -2).length 
                  ? '🔲 Tout désélectionner' 
                  : '✅ Tout sélectionner'}
              </button>
              
              <div className="quick-select-buttons">
                <button 
                  className="quick-select-btn"
                  onClick={() => {
                    const essentials = ['batiments', 'flotte-propre', 'deplacements-domicile'] as EmissionCategory[];
                    setAvailableCategories(essentials);
                    allSteps.slice(1, -2).forEach(step => {
                      const cat = step.id as EmissionCategory;
                      if (essentials.includes(cat)) {
                        selectCategory(cat);
                      } else {
                        deselectCategory(cat);
                      }
                    });
                  }}
                >
                  ⚡ Sélection rapide
                </button>
              </div>
            </div>
            
            <div className="categories-selection">
              {allSteps.slice(1, -2).map(step => {
                const category = step.id as EmissionCategory;
                const isSelected = availableCategories.includes(category);
                
                return (
                  <div 
                    key={category}
                    className={`category-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCategoryToggle(category)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCategoryToggle(category);
                      }
                    }}
                  >
                    <div className="category-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(category)}
                        id={`cat-${category}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="category-content">
                      <span className="category-icon">{step.icon}</span>
                      <div className="category-info">
                        <span className="category-name">{step.label}</span>
                        <span className="category-desc">{step.description}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="selected-badge">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="selection-summary">
              <p>
                <strong>{availableCategories.length}</strong> catégorie(s) sélectionnée(s) sur {allSteps.slice(1, -2).length}
              </p>
              {availableCategories.length > 0 && (
                <p className="summary-detail">
                  {availableCategories.map(cat => {
                    const step = allSteps.find(s => s.id === cat);
                    return step?.icon;
                  }).join(' ')}
                </p>
              )}
            </div>
          </div>
        );

      case 'category':
        return (
          <CategoryForm
            category={currentStep.id as EmissionCategory}
            onSubmit={(data) => {
              saveFormData({ [currentStep.id]: data });
              goToNextStep();
            }}
            onCancel={goToPreviousStep}
            initialData={state.forms.formData[currentStep.id as EmissionCategory]}
          />
        );

      case 'review':
        return (
          <div className="review-step">
            <h2>Vérification des données</h2>
            <p>Voici un récapitulatif des données saisies :</p>
            
            <div className="review-sections">
              {availableCategories.map(category => {
                const data = state.forms.formData[category];
                const step = allSteps.find(s => s.id === category);
                
                return (
                  <div key={category} className="review-section">
                    <h3>
                      <span className="section-icon">{step?.icon}</span>
                      {step?.label}
                    </h3>
                    {data ? (
                      <div className="review-data">
                        {Object.entries(data).map(([key, value]) => (
                          <div key={key} className="data-item">
                            <span className="data-label">{key}:</span>
                            <span className="data-value">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-data">Aucune donnée saisie</p>
                    )}
                    <button 
                      className="edit-button"
                      onClick={() => {
                        const stepIndex = activeSteps.findIndex(s => s.id === category);
                        if (stepIndex >= 0) goToStep(stepIndex);
                      }}
                    >
                      Modifier
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="results-preview-step">
            <h2>Calcul en cours...</h2>
            <div className="calculating-animation">
              <div className="spinner"></div>
              <p>Analyse des données...</p>
              <p>Application des facteurs d'émission...</p>
              <p>Génération des recommandations...</p>
            </div>
            <button 
              className="cta-button primary"
              onClick={handleComplete}
            >
              Voir les résultats détaillés
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="main-container tool-page-v2">
      {/* Barre de progression */}
      <ProgressBar
        steps={activeSteps.map((step, index) => ({
          id: step.id,
          label: step.label,
          icon: step.icon,
          description: index === currentStepIndex ? step.description : undefined
        }))}
        currentStep={currentStepIndex}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      {/* Contenu de l'étape */}
      <div className="step-content">
        {renderStepContent()}
      </div>

      {/* Boutons de navigation */}
      <div className="step-navigation">
        <button
          className="nav-button secondary"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
        >
          ← Étape précédente
        </button>

        {currentStepIndex === activeSteps.length - 1 ? (
          <button
            className="nav-button primary"
            onClick={handleComplete}
          >
            Terminer et voir les résultats →
          </button>
        ) : (
          <button
            className="nav-button primary"
            onClick={goToNextStep}
          >
            Étape suivante →
          </button>
        )}
      </div>

      {/* Boutons d'action flottants */}
      <div className="floating-actions">
        <button 
          className="save-button"
          onClick={saveManually}
        >
          💾 Sauvegarder
        </button>
        {completedSteps.length === 0 && restoredData && (
          <button 
            className="clear-button"
            onClick={() => {
              clearSavedData();
              window.location.reload();
            }}
          >
            🗑️ Nouvelle session
          </button>
        )}
      </div>
    </main>
  );
};

export default ToolV2;