import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const BusinessTravelForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Déplacements professionnels</h3>
      <div className="form-grid-3">
        <div className="form-group">
          <div className="field-with-info">
            <label>Train (km/an)</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Distance (km) × 0.014 kg CO₂/km.passager"
              explanation="Déplacements professionnels en train - transport décarboné"
            />
          </div>
          <input type="number" value={data.train || ''} onChange={(e) => onChange('train', parseFloat(e.target.value))} />
        </div>
        <div className="form-group">
          <div className="field-with-info">
            <label>Avion (km/an)</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Distance (km) × facteur selon distance"
              explanation="Court: 0.258, Moyen: 0.187, Long: 0.152 kg CO₂/km.passager"
            />
          </div>
          <input type="number" value={data.plane || ''} onChange={(e) => onChange('plane', parseFloat(e.target.value))} />
        </div>
        <div className="form-group">
          <div className="field-with-info">
            <label>Voiture (km/an)</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Distance (km) × 0.193 kg CO₂/km"
              explanation="Déplacements professionnels en voiture particulière"
            />
          </div>
          <input type="number" value={data.car || ''} onChange={(e) => onChange('car', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default BusinessTravelForm;