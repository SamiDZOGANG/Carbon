import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const CommuteForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Déplacements domicile-travail</h3>
      <div className="form-grid-2">
        <div className="form-group">
          <div className="field-with-info">
            <label>Nombre de collaborateurs</label>
            <InfoTooltip 
              formula="Nombre de salariés effectuant des trajets domicile-travail"
              explanation="Collaborateurs se déplaçant régulièrement vers le site de travail"
            />
          </div>
          <input type="number" value={data.employees || ''} onChange={(e) => onChange('employees', parseInt(e.target.value))} />
        </div>
        <div className="form-group">
          <div className="field-with-info">
            <label>Distance moyenne (km/jour)</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb collaborateurs × distance × jours/an × 0.193 kg CO₂/km"
              explanation="Distance aller-retour quotidienne moyenne domicile-travail"
            />
          </div>
          <input type="number" value={data.avg_distance || ''} onChange={(e) => onChange('avg_distance', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default CommuteForm;