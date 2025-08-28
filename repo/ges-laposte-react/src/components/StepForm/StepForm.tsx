import React, { useState } from 'react';
import IdentificationForm from '../CategoryForm/forms/IdentificationForm';
import EntityForm from '../CategoryForm/forms/EntityForm';
import BuildingsForm from '../CategoryForm/forms/BuildingsForm';
import TransportForm from '../CategoryForm/forms/TransportForm';
import PersonnelForm from '../CategoryForm/forms/PersonnelForm';
import PurchasesAndWasteForm from '../CategoryForm/forms/PurchasesAndWasteForm';
import './StepForm.css';
import './StepFormStyles.css';

interface StepFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const steps = [
  { 
    id: 1, 
    title: 'Identification', 
    description: 'Renseignements généraux et informations de contact',
    context: 'Cette étape permet d\'identifier le bilan GES, sa période d\'étude et son responsable. Elle constitue la base administrative de votre analyse carbone.'
  },
  { 
    id: 2, 
    title: 'Entité', 
    description: 'Caractérisation de l\'organisation et effectifs',
    context: 'Définissez le périmètre organisationnel de votre bilan : type d\'entité, code REGATE, unité de rattachement et effectifs internes/externes (ETP).'
  },
  { 
    id: 3, 
    title: 'Bâtiments', 
    description: 'Patrimoine immobilier et consommations énergétiques',
    context: 'Inventoriez vos sites, surfaces occupées et consommations énergétiques (électricité, gaz, fioul). Utilisez l\'outil SOBRE si disponible pour les données précises.'
  },
  { 
    id: 4, 
    title: 'Transport', 
    description: 'Flotte de véhicules et logistique externe',
    context: 'Recensez votre flotte propre (véhicules, carburants, kilométrage) et les prestations de transport sous-traitées pour l\'activité postale.'
  },
  { 
    id: 5, 
    title: 'Personnel', 
    description: 'Mobilité des collaborateurs et déplacements professionnels',
    context: 'Analysez l\'organisation du travail (télétravail, horaires), les trajets domicile-travail et les déplacements professionnels de vos équipes.'
  },
  { 
    id: 6, 
    title: 'Achats & Déchets', 
    description: 'Approvisionnements, restauration et gestion des déchets',
    context: 'Évaluez vos achats de fournitures, équipements informatiques, prestations de restauration et la gestion des déchets générés par votre activité.'
  }
];

const StepForm: React.FC<StepFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData || {});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};
    
    switch (currentStep) {
      case 1: // Identification
        if (!formData.bilan_ges_number?.trim()) {
          errors.bilan_ges_number = 'Le numéro de bilan GES est requis';
        }
        if (!formData.creation_date) {
          errors.creation_date = 'La date de création est requise';
        }
        if (!formData.report_year) {
          errors.report_year = 'L\'année de rapport est requise';
        }
        if (!formData.author_lastname?.trim()) {
          errors.author_lastname = 'Le nom de l\'auteur est requis';
        }
        if (!formData.author_firstname?.trim()) {
          errors.author_firstname = 'Le prénom de l\'auteur est requis';
        }
        if (!formData.author_email?.trim()) {
          errors.author_email = 'L\'adresse email est requise';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.author_email)) {
          errors.author_email = 'Format d\'email invalide';
        }
        break;
        
      case 2: // Entité
        if (!formData.entity_name?.trim()) {
          errors.entity_name = 'Le nom de l\'entité est requis';
        }
        if (!formData.entity_type) {
          errors.entity_type = 'Le type d\'entité est requis';
        }
        if (!formData.regate_code?.trim()) {
          errors.regate_code = 'Le code REGATE est requis';
        }
        if (formData.internal_employees !== 0 && !formData.internal_employees) {
          errors.internal_employees = 'Le nombre de collaborateurs internes est requis';
        }
        break;
        
      case 3: // Bâtiments
        if (formData.buildings && formData.buildings.length > 0) {
          formData.buildings.forEach((building: any, index: number) => {
            if (!building.building_name?.trim()) {
              errors[`building_${index}_name`] = `Le nom du bâtiment ${index + 1} est requis`;
            }
            if (!building.full_address?.trim()) {
              errors[`building_${index}_address`] = `L'adresse du bâtiment ${index + 1} est requise`;
            }
          });
        }
        break;
        
      case 4: // Transport
        // Validation optionnelle car certains champs peuvent être à 0
        break;
        
      case 5: // Personnel
        // Validation optionnelle car certains champs peuvent être à 0
        break;
        
      case 6: // Achats & Déchets
        // Validation optionnelle car certains champs peuvent être à 0
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }
    
    if (currentStep === steps.length) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    const commonProps = {
      data: formData,
      onChange: handleInputChange,
      errors: validationErrors
    };

    switch (currentStep) {
      case 1:
        return <IdentificationForm {...commonProps} />;
      case 2:
        return <EntityForm {...commonProps} />;
      case 3:
        return <BuildingsForm {...commonProps} />;
      case 4:
        return <TransportForm {...commonProps} />;
      case 5:
        return <PersonnelForm {...commonProps} />;
      case 6:
        return <PurchasesAndWasteForm {...commonProps} />;
      default:
        return null;
    }
  };

  const getProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    <div className="step-form-container">
      <div className="step-form">
        <div className="form-header">
          <div>
            <h2>Calculateur GES La Poste - Étape {currentStep} sur {steps.length} - {steps[currentStep - 1].title}</h2>
          </div>
          <button 
            className="close-btn"
            onClick={onCancel}
            aria-label="Fermer le formulaire"
          >
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="steps-navigation">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-item ${
                step.id === currentStep ? 'active' : ''
              } ${step.id < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step.id)}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="current-step-header">
              <h3>
                Étape {currentStep}: {steps[currentStep - 1].title}
              </h3>
              <p className="step-description">{steps[currentStep - 1].description}</p>
              <div className="step-context">
                <p>{steps[currentStep - 1].context}</p>
              </div>
            </div>
            
            {renderStepContent()}
          </div>
          
          {/* Indicateur de défilement sur mobile */}
          <div className="scroll-indicator">
            <span>↓ Défiler pour voir tous les champs ↓</span>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cta-button secondary"
              onClick={onCancel}
            >
              Annuler
            </button>
            
            <div className="navigation-buttons">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="cta-button secondary"
                  onClick={handlePrevious}
                >
                  ← Précédent
                </button>
              )}
              
              <button 
                type="submit" 
                className="cta-button primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner">⏳</span>
                    Traitement...
                  </>
                ) : (
                  currentStep === steps.length ? 'Calculer le résultat' : 'Suivant →'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepForm;