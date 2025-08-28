import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const FoodForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Alimentation et restauration</h3>
      <div className="form-grid-2">
        <div className="form-group">
          <div className="field-with-info">
            <label>Nombre de repas/an</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb repas × facteur selon type de repas"
              explanation="Repas servis sur site (cantine, restaurant d'entreprise)"
            />
          </div>
          <input type="number" value={data.meals || ''} onChange={(e) => onChange('meals', parseInt(e.target.value))} />
        </div>
        <div className="form-group">
          <div className="field-with-info">
            <label>Part de repas végétariens (%)</label>
            <InfoTooltip 
              formula="Réduction d'émissions = % végétarien × différence facteurs"
              explanation="Pourcentage de repas sans viande - réduit significativement l'impact carbone"
            />
          </div>
          <input type="number" min="0" max="100" value={data.vegetarian_percentage || ''} onChange={(e) => onChange('vegetarian_percentage', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default FoodForm;