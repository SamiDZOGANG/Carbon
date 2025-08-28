import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import CategorySelector from '../../components/CategorySelector/CategorySelector';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { EmissionCategory } from '../../config/constants';
import './Tool.css';

const Tool: React.FC = () => {
  const { state, saveFormData } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<EmissionCategory | null>(null);
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { id: 'batiments', name: 'Bâtiments', icon: '🏢', description: 'Consommation énergétique des bâtiments' },
    { id: 'flotte-propre', name: 'Flotte en propre', icon: '🚚', description: 'Véhicules appartenant à La Poste' },
    { id: 'transport-sous-traite', name: 'Transport sous-traité', icon: '📦', description: 'Transport externalisé' },
    { id: 'deplacements-domicile', name: 'Déplacements domicile-travail', icon: '🏠', description: 'Trajets des collaborateurs' },
    { id: 'deplacements-professionnels', name: 'Déplacements professionnels', icon: '✈️', description: 'Missions et déplacements pro' },
    { id: 'frequentation', name: 'Fréquentation', icon: '👥', description: 'Clients et collaborateurs' },
    { id: 'alimentation', name: 'Alimentation', icon: '🍽️', description: 'Restauration collective' },
    { id: 'achats', name: 'Achats', icon: '🛒', description: 'Achats et consommables' },
    { id: 'dechets', name: 'Déchets', icon: '♻️', description: 'Gestion des déchets' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId as EmissionCategory);
  };

  const handleFormSubmit = (data: any) => {
    saveFormData({ [activeCategory!]: data });
    setActiveCategory(null);
  };

  const handleCalculate = () => {
    // Calculer les émissions totales
    setShowResults(true);
  };

  return (
    <main className="main-container tool-page">
      <div className="tool-header">
        <h1>Calculateur Bilan GES</h1>
        <p className="tool-subtitle">
          Sélectionnez les catégories d'émissions pertinentes pour votre entité
        </p>
      </div>

      {!activeCategory && !showResults && (
        <>
          <div className="categories-grid">
            {categories.map((category) => (
              <CategorySelector
                key={category.id}
                category={category}
                isSelected={state.forms.selectedCategories.has(category.id as EmissionCategory)}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>

          {state.forms.selectedCategories.size > 0 && (
            <div className="actions-section">
              <button 
                className="cta-button primary"
                onClick={handleCalculate}
              >
                📊 Calculer les émissions
              </button>
            </div>
          )}
        </>
      )}

      {activeCategory && (
        <CategoryForm
          category={activeCategory}
          onSubmit={handleFormSubmit}
          onCancel={() => setActiveCategory(null)}
          initialData={state.forms.formData[activeCategory]}
        />
      )}

      {showResults && (
        <div className="results-preview">
          <h2>Résultats préliminaires</h2>
          <div className="results-summary">
            <div className="result-card">
              <h3>Total des émissions</h3>
              <p className="result-value">
                {calculateTotalEmissions(state.forms.formData)} tCO2e
              </p>
            </div>
          </div>
          <div className="results-actions">
            <button 
              className="cta-button secondary"
              onClick={() => setShowResults(false)}
            >
              ← Retour aux catégories
            </button>
            <a href="/resultats" className="cta-button primary">
              Voir les résultats détaillés →
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

// Fonction de calcul simplifié
function calculateTotalEmissions(formData: any): string {
  // Logique de calcul à implémenter selon les facteurs d'émission
  let total = 0;
  
  // Exemple de calcul simplifié
  Object.values(formData).forEach((categoryData: any) => {
    if (typeof categoryData === 'object') {
      Object.values(categoryData).forEach((value: any) => {
        if (typeof value === 'number') {
          total += value * 0.001; // Facteur d'émission exemple
        }
      });
    }
  });
  
  return total.toFixed(2);
}

export default Tool;