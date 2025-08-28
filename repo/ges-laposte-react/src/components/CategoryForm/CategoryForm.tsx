import React, { useState } from 'react';
import { EmissionCategory } from '../../config/constants';
import BuildingsForm from './forms/BuildingsForm';
import FleetForm from './forms/FleetForm';
import TransportForm from './forms/TransportForm';
import CommuteForm from './forms/CommuteForm';
import BusinessTravelForm from './forms/BusinessTravelForm';
import AttendanceForm from './forms/AttendanceForm';
import FoodForm from './forms/FoodForm';
import PurchasesForm from './forms/PurchasesForm';
import WasteForm from './forms/WasteForm';
import './CategoryForm.css';

interface CategoryFormProps {
  category: EmissionCategory;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  onSubmit, 
  onCancel, 
  initialData 
}) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderForm = () => {
    switch (category) {
      case 'batiments':
        return <BuildingsForm data={formData} onChange={handleInputChange} />;
      case 'flotte-propre':
        return <FleetForm data={formData} onChange={handleInputChange} />;
      case 'transport-sous-traite':
        return <TransportForm data={formData} onChange={handleInputChange} />;
      case 'deplacements-domicile':
        return <CommuteForm data={formData} onChange={handleInputChange} />;
      case 'deplacements-professionnels':
        return <BusinessTravelForm data={formData} onChange={handleInputChange} />;
      case 'frequentation':
        return <AttendanceForm data={formData} onChange={handleInputChange} />;
      case 'alimentation':
        return <FoodForm data={formData} onChange={handleInputChange} />;
      case 'achats':
        return <PurchasesForm data={formData} onChange={handleInputChange} />;
      case 'dechets':
        return <WasteForm data={formData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  const getCategoryTitle = () => {
    const titles: Record<EmissionCategory, string> = {
      'batiments': 'Bâtiments',
      'flotte-propre': 'Flotte en propre',
      'transport-sous-traite': 'Transport sous-traité',
      'deplacements-domicile': 'Déplacements domicile-travail',
      'deplacements-professionnels': 'Déplacements professionnels',
      'frequentation': 'Fréquentation',
      'alimentation': 'Alimentation',
      'achats': 'Achats',
      'dechets': 'Déchets'
    };
    return titles[category];
  };

  return (
    <div className="category-form-container">
      <div className="category-form">
        <div className="form-header">
          <h2>{getCategoryTitle()}</h2>
          <button 
            className="close-btn"
            onClick={onCancel}
            aria-label="Fermer le formulaire"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            {renderForm()}
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
            <button 
              type="submit" 
              className="cta-button primary"
            >
              Valider et continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;