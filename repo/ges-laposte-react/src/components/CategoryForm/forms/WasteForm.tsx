import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const WasteForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Gestion des déchets</h3>
      <div className="form-grid-3">
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Déchets recyclables <small>(tonnes/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Poids (t) × 0.021 t CO₂/t"
              explanation="Déchets triés et recyclés - faible impact carbone"
            />
          </div>
          <input type="number" value={data.recyclable || ''} onChange={(e) => onChange('recyclable', parseFloat(e.target.value))} />
        </div>
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Déchets non recyclables <small>(tonnes/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Poids (t) × 0.467 t CO₂/t"
              explanation="Déchets incinérés ou enfouis - fort impact carbone"
            />
          </div>
          <input type="number" value={data.non_recyclable || ''} onChange={(e) => onChange('non_recyclable', parseFloat(e.target.value))} />
        </div>
        <div className="form-group compact">
          <div className="field-with-info">
            <label>Déchets dangereux <small>(tonnes/an)</small></label>
            <InfoTooltip 
              formula="Émissions CO₂ = Poids (t) × facteur selon type traitement"
              explanation="Déchets toxiques nécessitant un traitement spécialisé"
            />
          </div>
          <input type="number" value={data.hazardous || ''} onChange={(e) => onChange('hazardous', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default WasteForm;