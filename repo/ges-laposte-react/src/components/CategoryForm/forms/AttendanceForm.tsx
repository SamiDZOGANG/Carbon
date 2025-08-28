import React from 'react';
import InfoTooltip from '../../StepForm/InfoTooltip';

const AttendanceForm: React.FC<{ data: any; onChange: (field: string, value: any) => void }> = ({ data, onChange }) => (
  <div className="form-sections">
    <div className="form-section">
      <h3>Fréquentation</h3>
      <div className="form-grid-2">
        <div className="form-group">
          <div className="field-with-info">
            <label>Nombre de visiteurs/an</label>
            <InfoTooltip 
              formula="Émissions CO₂ = Nb visiteurs × distance moyenne × 0.193 kg CO₂/km"
              explanation="Visiteurs, clients, livraisons - impact des déplacements vers le site"
            />
          </div>
          <input type="number" value={data.visitors || ''} onChange={(e) => onChange('visitors', parseInt(e.target.value))} />
        </div>
        <div className="form-group">
          <div className="field-with-info">
            <label>Distance moyenne parcourue (km)</label>
            <InfoTooltip 
              formula="Distance aller-retour moyenne des visiteurs"
              explanation="Distance moyenne parcourue par les visiteurs pour se rendre sur le site"
            />
          </div>
          <input type="number" value={data.avg_distance || ''} onChange={(e) => onChange('avg_distance', parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  </div>
);

export default AttendanceForm;